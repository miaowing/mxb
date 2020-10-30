import * as React from 'react';
import Head from "next/head";
import { Layout } from "../../components/layout.component";
import { Header } from "../../components/header.component";
import { GET_POSTS } from "../../graphql/post.gql";
import { Button } from "../../components/button.component";
import { Footer } from "../../components/footer.component";
import { Cards, Card } from "../../components/card.component";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "@apollo/client";

export default ({ meta }) => {
    const [page, updatePage] = useState(1);
    const [size] = useState(6);
    const first = page * size;

    const { error, data, refetch } = useQuery(GET_POSTS, { variables: { skip: 0, first } });
    if (error) {
        return <div>{error}</div>;
    }

    const posts = data?.allPosts ?? [];
    const count = data?._allPostsMeta?.count ?? 0;

    const loadMore = async () => {
        await refetch({ skip: 0, first: (page + 1) * size });
        updatePage(page + 1);
    }
    return <>
        <Layout>
            <Head>
                <title>Blog - {meta.title} - {meta.description}</title>
            </Head>
            <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
            <Cards title="">
                {posts.map(post => <Card
                    key={post.id}
                    description={dayjs(post.createdAt).format('YYYY-MM-DD hh:mm')}
                    thumb={post?.thumb?.publicUrl}
                    url={`/posts/${post.key}`}
                    title={post.title}/>)}
            </Cards>
            <div style={{ textAlign: 'center' }}>
                {count > page * size && <Button onClick={() => loadMore()}>
                    Load More ↓
                </Button>}
            </div>
            <Footer title={meta.title} icp={{ icp: meta.icp, url: meta.icp_url }}/>
        </Layout>
    </>;
}
