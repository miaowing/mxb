import * as React from 'react';
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Query } from "../components/query.component";
import { GET_SITE_METADATA } from "../graphql/metadata.gql";
import { GET_ABOUT } from "../graphql/post.gql";
import { Post } from "../components/post.component";
import { Footer } from "../components/footer.component";

export default class AboutPage extends React.Component<any, any> {
    render() {
        return <>
            <Layout>
                <Query type="object" query={GET_SITE_METADATA} render={site => <>
                    <Head>
                        <title>About - {site.title}</title>
                    </Head>
                    <Header title={site.title} avatar={site?.avatar?.publicUrl}/>
                    <Query type="object" query={GET_ABOUT} render={post => <Layout>
                        <Post post={post}/>
                    </Layout>}/>
                    <Footer title={site.title} icp={{ icp: site.icp, url: site.icp_url }}/>
                </>}/>
            </Layout>
        </>;
    }
}
