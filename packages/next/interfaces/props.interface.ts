export interface ConfigProps {
    config?: {
        serverRuntimeConfig: any;
        publicRuntimeConfig: {
            serverUrl: string;
        };
    }
}
