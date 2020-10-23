import * as React from 'react';
import { WithRouter } from "../decorators";
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Query } from "../components/query.component";
import { GET_SITE_METADATA } from "../graphql/metadata.gql";
import { GET_ABOUT } from "../graphql/post.gql";
import { Post } from "../components/post.component";

export interface IHomepageProps {
    lang: string;
}

@WithRouter()
export default class Homepage extends React.Component<IHomepageProps, any> {
    render() {
        return <>
            <Layout>
                <Query type="object" query={GET_SITE_METADATA} render={data => <>
                    <Head>
                        <title>About - {data.title}</title>
                    </Head>
                    <Header title={data.title}/>
                </>}/>
                <Query type="object" query={GET_ABOUT} render={post => <Layout>
                    <Post post={post}/>
                </Layout>}/>
            </Layout>
        </>;
    }
}
