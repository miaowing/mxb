import * as React from 'react';
import Head from "next/head";
import { Layout } from "../../../components/layout.component";
import { Query } from "../../../components/query.component";
import { GET_POST } from "../../../graphql/post.gql";
import { Header } from "../../../components/header.component";
import { Post } from "../../../components/post.component";
import { Footer } from "../../../components/footer.component";
import { BaseProps } from "../../../interfaces/props.interface";
import { CommentContainer } from "../../../containers/comment.container";

export default class PostPage extends React.Component<BaseProps, any> {
    static async getInitialProps(context) {
        return { id: context.query.id };
    }

    render() {
        const { id, meta } = this.props;
        return <>
            <Layout>
                <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
                <Query type="object" query={GET_POST} variables={{ key: id }} render={post => <>
                    <Head>
                        <title>{post.title} - {meta.title}</title>
                        <meta name="keywords" content={post.keywords ?? meta.keywords}/>
                        <meta name="description" content={post.description ?? meta.description}/>
                    </Head>
                    <Layout>
                        <Post post={post}/>
                    </Layout>
                    <div className="post-comment-wrap">
                        <div style={{ margin: '0 auto' }}>
                            <CommentContainer page={`/posts/${post.key}`} meta={meta}/>
                        </div>
                    </div>
                </>}/>
                <Footer title={meta.title} icp={{ icp: meta.icp, url: meta.icp_url }}/>
            </Layout>
        </>;
    }
}
