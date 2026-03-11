/**
 * OAuth 2.0 helpers for the Ultrahuman Partner API.
 *
 * Flow:
 *  1. User clicks "Login" in admin UI → browser opens authorization URL
 *  2. User authenticates with Ultrahuman and approves scopes
 *  3. Ultrahuman redirects to http://localhost:<port>/callback?code=...
 *  4. This module exchanges the code for access + refresh tokens
 *  5. Tokens are stored encrypted in the adapter config
 *  6. On expiry, the refresh token is used to obtain a new access token
 */
import * as http from "node:http";
import axios from "axios";

const AUTH_BASE = "https://partner.ultrahuman.com";
const AUTHORIZE_URL = `${AUTH_BASE}/oauth/authorize`;
const TOKEN_URL = `${AUTH_BASE}/oauth/token`;
const DEFAULT_SCOPES = "ring_data profile";

export interface OAuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenExpiry: number;
}

export function buildAuthorizationUrl(
    clientId: string,
    redirectUri: string,
    state: string,
): string {
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: DEFAULT_SCOPES,
        state,
    });
    return `${AUTHORIZE_URL}?${params.toString()}`;
}

export async function exchangeCodeForTokens(
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
): Promise<OAuthTokens> {
    const response = await axios.post(
        TOKEN_URL,
        new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
        }).toString(),
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            timeout: 15_000,
        },
    );

    const data = response.data;
    const expiresIn = data.expires_in ?? 604800; // default 7 days
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn,
        tokenExpiry: Date.now() + expiresIn * 1000,
    };
}

export async function refreshAccessToken(
    refreshToken: string,
    clientId: string,
    clientSecret: string,
): Promise<OAuthTokens> {
    const response = await axios.post(
        TOKEN_URL,
        new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
        }).toString(),
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            timeout: 15_000,
        },
    );

    const data = response.data;
    const expiresIn = data.expires_in ?? 604800;
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? refreshToken,
        expiresIn,
        tokenExpiry: Date.now() + expiresIn * 1000,
    };
}

export function isTokenExpired(tokenExpiry: number, bufferMs = 300_000): boolean {
    return Date.now() > tokenExpiry - bufferMs;
}

const SUCCESS_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Ultrahuman - Erfolg</title>
<style>body{font-family:system-ui,sans-serif;display:flex;justify-content:center;
align-items:center;min-height:100vh;margin:0;background:#f0fdf4}
.card{background:#fff;border-radius:16px;padding:48px;text-align:center;
box-shadow:0 4px 24px rgba(0,0,0,.1);max-width:400px}
h1{color:#16a34a;margin:0 0 16px}p{color:#555;line-height:1.6}</style></head>
<body><div class="card"><h1>Verbunden!</h1>
<p>Dein Ultrahuman-Konto ist jetzt mit ioBroker verbunden.<br>
Du kannst dieses Fenster schliessen.</p></div></body></html>`;

const ERROR_HTML = (msg: string): string => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Ultrahuman - Fehler</title>
<style>body{font-family:system-ui,sans-serif;display:flex;justify-content:center;
align-items:center;min-height:100vh;margin:0;background:#fef2f2}
.card{background:#fff;border-radius:16px;padding:48px;text-align:center;
box-shadow:0 4px 24px rgba(0,0,0,.1);max-width:400px}
h1{color:#dc2626;margin:0 0 16px}p{color:#555;line-height:1.6}</style></head>
<body><div class="card"><h1>Fehler</h1>
<p>${msg}</p></div></body></html>`;

/**
 * Starts a temporary HTTP server that waits for the OAuth callback.
 * Resolves with the authorization code once received.
 */
export function startCallbackServer(
    port: number,
    expectedState: string,
    timeoutMs = 300_000,
): Promise<{ code: string; server: http.Server }> {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            const url = new URL(req.url ?? "/", `http://localhost:${port}`);

            if (url.pathname !== "/callback") {
                res.writeHead(404);
                res.end("Not found");
                return;
            }

            const code = url.searchParams.get("code");
            const state = url.searchParams.get("state");
            const error = url.searchParams.get("error");

            if (error) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(ERROR_HTML(`Ultrahuman hat den Zugriff verweigert: ${error}`));
                reject(new Error(`OAuth error: ${error}`));
                return;
            }

            if (state !== expectedState) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(ERROR_HTML("Ungültiger State-Parameter. Bitte versuche es erneut."));
                reject(new Error("State mismatch"));
                return;
            }

            if (!code) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(ERROR_HTML("Kein Authorization Code erhalten."));
                reject(new Error("No code received"));
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(SUCCESS_HTML);
            resolve({ code, server });
        });

        server.listen(port);

        const timeout = setTimeout(() => {
            server.close();
            reject(new Error("OAuth callback timeout"));
        }, timeoutMs);

        server.on("close", () => clearTimeout(timeout));
    });
}
