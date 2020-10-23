import * as React from 'react';

// import { zh_cn, en_us } from '../locales';

export function withI18N(ComposedComponent) {
    function WithRouterWrapper(props: any) {
        const t = (lang: string, module: string, name: string) => {
            if (lang.includes('en')) {
                // return en_us[module][name];
            }

            // return zh_cn[module][name];
        };
        const get = (lang: string, object: any, key: string) => {
            if (lang.includes('en')) {
                return object[`en_${key}`]
            }

            return object[`cn_${key}`]
        };
        return <ComposedComponent t={t} get={get} {...props} />
    }

    WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
    (WithRouterWrapper as any).origGetInitialProps = (ComposedComponent as any).origGetInitialProps;
    if (process.env.NODE_ENV !== 'production') {
        const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
        WithRouterWrapper.displayName = `withI18N(${name})`;
    }

    return WithRouterWrapper;
}
