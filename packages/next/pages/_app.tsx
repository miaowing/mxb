import * as React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/index.less';
import { WithApollo, WithConfig } from "../decorators";
import ApolloClient from "apollo-client";
import { ConfigProps } from "../interfaces/props.interface";

export interface MyAppProps extends ConfigProps {
    apolloClient?: ApolloClient<any>;
    user?: any;
}

@WithApollo()
@WithConfig()
export default class MyApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, apolloClient, user } = this.props;
        return (
            <ToastProvider autoDismissTimeout={2000} autoDismiss={true}>
                <ApolloProvider client={apolloClient}>
                    <Head>
                        <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
                    </Head>
                    <Component {...pageProps} user={user}/>
                </ApolloProvider>
            </ToastProvider>
        );
    }
}
