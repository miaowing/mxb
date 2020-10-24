import * as React from 'react';
import { WithRouter } from "../../decorators";
import Head from "next/head";
import { Layout } from "../../components/layout.component";
import { Header } from "../../components/header.component";
import { Query } from "../../components/query.component";
import { GET_SITE_METADATA } from "../../graphql/metadata.gql";
import { GET_POSTS } from "../../graphql/post.gql";
import { Button } from "../../components/button.component";
import { Footer } from "../../components/footer.component";
import { PostCard, PostCards } from "../../components/post-card.component";

export interface IHomepageProps {
    lang: string;
}

@WithRouter()
export default class Homepage extends React.Component<IHomepageProps, any> {
    state = {
        page: 1,
        size: 6,
    }

    loadMore() {
        this.setState({ page: this.state.page + 1 });
    }

    render() {
        const { page, size } = this.state;
        const first = page * size;
        return <>
            <Layout>
                <Query type="object" query={GET_SITE_METADATA} render={site => <>
                    <Head>
                        <title>Blog - {site.title}</title>
                    </Head>
                    <Header title={site.title} avatar={site?.avatar?.publicUrl}/>
                    <Query
                        query={GET_POSTS} variables={{ skip: 0, first }}
                        render={(posts, meta) => {
                            return <>
                                <PostCards title="">
                                    {posts.map(post => <PostCard key={post.id} post={post}/>)}
                                </PostCards>
                                <div style={{ textAlign: 'center' }}>
                                    {meta.count > page * size && <Button onClick={() => this.loadMore()}>
                                        Load More ↓
                                    </Button>}
                                </div>
                            </>
                        }}/>
                    <Footer title={site.title} icp={{ icp: site.icp, url: site.icp_url }}/>
                </>}/>
            </Layout>
        </>;
    }
}
