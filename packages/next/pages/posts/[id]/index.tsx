import * as React from 'react';
import Head from "next/head";
import { Layout } from "../../../components/layout.component";
import { Query } from "../../../components/query.component";
import { GET_POST } from "../../../graphql/post.gql";
import { Header } from "../../../components/header.component";
import { GET_SITE_METADATA } from "../../../graphql/metadata.gql";
import { Post } from "../../../components/post.component";
import { Footer } from "../../../components/footer.component";

export default class PostPage extends React.Component<any, any> {
    static async getInitialProps(context) {
        return { id: context.query.id };
    }

    render() {
        const { id } = this.props;
        return <>
            <Layout>
                <Query type="object" query={GET_SITE_METADATA} render={site => <>
                    <Header title={site.title}/>
                    <Query type="object" query={GET_POST} variables={{ key: id }} render={post => <>
                        <Head>
                            <title>{post.title} - {site.title}</title>
                        </Head>
                        <Layout>
                            <Post post={post}/>
                        </Layout>
                    </>}/>
                    <Footer title={site.title}/>
                </>}/>
            </Layout>
        </>;
    }
}
