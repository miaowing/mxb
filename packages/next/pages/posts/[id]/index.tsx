import * as React from 'react';
import Head from "next/head";
import { Layout } from "../../../containers/layout.container";
import { Query } from "../../../components/query.component";
import { GET_POST } from "../../../graphql/post.gql";
import { Header } from "../../../containers/header.container";
import { Post } from "../../../containers/post.container";
import { Footer } from "../../../containers/footer.container";
import { BaseProps } from "../../../interfaces/props.interface";
import { CommentContainer } from "../../../containers/comment.container";
import { AvatarCard } from "../../../components/avatar-card.component";

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
                        <link href={"https://mxbcc.oss-cn-beijing.aliyuncs.com/js/prism.css"} rel="stylesheet"/>
                        <script src={"https://mxbcc.oss-cn-beijing.aliyuncs.com/js/prism.js"}/>
                    </Head>
                    <Post post={post} avatar={meta?.avatar?.publicUrl} title={meta.title}>
                        <CommentContainer page={`/posts/${post.key}`} meta={meta}/>
                    </Post>
                </>}/>
                <Footer meta={meta}/>
            </Layout>
        </>;
    }
}
