import * as React from 'react';
import getConfig from 'next/config';

export function withConfig(ComposedComponent) {
    function WithRouterWrapper(props: any) {
        const config = getConfig();
        return <ComposedComponent config={config} {...props} />
    }

    WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
    (WithRouterWrapper as any).origGetInitialProps = (ComposedComponent as any).origGetInitialProps;
    if (process.env.NODE_ENV !== 'production') {
        const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
        WithRouterWrapper.displayName = `withConfig(${name})`;
    }

    return WithRouterWrapper;
}
