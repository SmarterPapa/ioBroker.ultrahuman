declare namespace ioBroker {
    interface AdapterConfig {
        authMode: "apikey" | "oauth";

        // API Key mode
        apiSecret: string;
        userEmail: string;

        // OAuth 2.0 mode
        clientId: string;
        clientSecret: string;
        oauthCallbackPort: number;
        accessToken: string;
        refreshToken: string;
        tokenExpiry: number;

        // Common
        pollingInterval: number;
    }
}
