import * as React from 'react';
import Head from "next/head";
import { Layout } from "../containers/layout.container";
import { Header } from "../containers/header.container";
import { Query } from "../components/query.component";
import { GET_GUEST_BOOK } from "../graphql/post.gql";
import { Post } from "../containers/post.container";
import { Footer } from "../containers/footer.container";
import { BaseProps } from "../interfaces/props.interface";
import { CommentContainer } from "../containers/comment.container";

export default class GuestBookPage extends React.Component<BaseProps, any> {
    render() {
        const { meta } = this.props;
        return <>
            <Layout>
                <Head>
                    <title>Guest book - {meta.title} - {meta.description}</title>
                </Head>
                <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
                <Query type="object" query={GET_GUEST_BOOK} render={post => <Layout>
                    <Post post={post} meta={meta}>
                        <CommentContainer page="/guest-book" meta={meta}/>
                    </Post>
                </Layout>}/>
                <Footer meta={meta}/>
            </Layout>
        </>;
    }
}
