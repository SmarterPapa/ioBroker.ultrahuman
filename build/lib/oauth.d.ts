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
export interface OAuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenExpiry: number;
}
export declare function buildAuthorizationUrl(clientId: string, redirectUri: string, state: string): string;
export declare function exchangeCodeForTokens(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<OAuthTokens>;
export declare function refreshAccessToken(refreshToken: string, clientId: string, clientSecret: string): Promise<OAuthTokens>;
export declare function isTokenExpired(tokenExpiry: number, bufferMs?: number): boolean;
/**
 * Starts a temporary HTTP server that waits for the OAuth callback.
 * Resolves with the authorization code once received.
 */
export declare function startCallbackServer(port: number, expectedState: string, timeoutMs?: number): Promise<{
    code: string;
    server: http.Server;
}>;
//# sourceMappingURL=oauth.d.ts.map