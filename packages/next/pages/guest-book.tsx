import * as React from 'react';
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Query } from "../components/query.component";
import { GET_GUEST_BOOK } from "../graphql/post.gql";
import { Post } from "../components/post.component";
import { Footer } from "../components/footer.component";
import { BaseProps } from "../interfaces/props.interface";
import { CommentContainer } from "../containers/comment.container";

export default class GuestBookPage extends React.Component<BaseProps, any> {
    render() {
        const { meta } = this.props;
        return <>
            <Layout>
                <Head>
                    <title>About - {meta.title} - {meta.description}</title>
                </Head>
                <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
                <Query type="object" query={GET_GUEST_BOOK} render={post => <Layout>
                    <Post post={post}/>
                </Layout>}/>
                <div className="post-comment-wrap">
                    <div>
                        <CommentContainer page="/guest-book" meta={meta}/>
                    </div>
                </div>
                <Footer meta={meta}/>
            </Layout>
        </>;
    }
}
