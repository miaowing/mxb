import * as React from 'react';
import { WithRouter } from "../../decorators";
import Head from "next/head";
import { Layout } from "../../components/layout.component";
import { Header } from "../../components/header.component";
import { Query } from "../../components/query.component";
import { GET_POSTS } from "../../graphql/post.gql";
import { Button } from "../../components/button.component";
import { Footer } from "../../components/footer.component";
import { Cards, Card } from "../../components/card.component";
import { BaseProps } from "../../interfaces/props.interface";
import { Post } from "../../interfaces/post.interface";
import dayjs from "dayjs";

@WithRouter()
export default class Homepage extends React.Component<BaseProps, any> {
    state = {
        page: 1,
        size: 6,
    }

    loadMore() {
        this.setState({ page: this.state.page + 1 });
    }

    render() {
        const { meta } = this.props;
        const { page, size } = this.state;
        const first = page * size;
        return <>
            <Layout>
                <Head>
                    <title>Blog - {meta.title}</title>
                </Head>
                <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
                <Query
                    query={GET_POSTS} variables={{ skip: 0, first }}
                    render={(posts: Post[], meta) => {
                        return <>
                            <Cards title="">
                                {posts.map(post => <Card
                                    key={post.id}
                                    description={dayjs(post.createdAt).format('YYYY-MM-DD hh:mm')}
                                    thumb={post?.thumb?.publicUrl}
                                    url={`/posts/${post.key}`}
                                    title={post.title}/>)}
                            </Cards>
                            <div style={{ textAlign: 'center' }}>
                                {meta.count > page * size && <Button onClick={() => this.loadMore()}>
                                    Load More ↓
                                </Button>}
                            </div>
                        </>
                    }}/>
                <Footer title={meta.title} icp={{ icp: meta.icp, url: meta.icp_url }}/>
            </Layout>
        </>;
    }
}
