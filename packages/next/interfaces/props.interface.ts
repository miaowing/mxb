import * as React from 'react';

export interface ConfigProps {
    config?: {
        serverRuntimeConfig: any;
        publicRuntimeConfig: {
            serverUrl: string;
        };
    }
}

export interface BaseProps {
    id?: string;
    key?: string;
    style?: React.CSSProperties;
    className?: string;
    ref?: any;
}
