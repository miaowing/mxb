import * as React from 'react';
import Head from "next/head";
import { Layout } from "../containers/layout.container";
import { Header } from "../containers/header.container";
import { Query } from "../components/query.component";
import { GET_GALLERIES } from "../graphql/gallery.gql";
import { Gallery } from "../interfaces/gallery.interface";
import { GET_BANNER } from "../graphql/banner.gql";
import { Banner } from "../components/banner.component";
import { GET_LATEST_POSTS } from "../graphql/post.gql";
import { Footer } from "../containers/footer.container";
import { Cards, Card } from "../components/card.component";
import { BaseProps } from "../interfaces/props.interface";
import { Post } from "../interfaces/post.interface";
import dayjs from "dayjs";
import { GalleriesContainer } from "../containers/galleries.container";


export default class Homepage extends React.Component<BaseProps, any> {
    render() {
        const { meta } = this.props;
        return <>
            <Layout>
                <Head>
                    <title>{meta.title} - {meta.description}</title>
                </Head>
                <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                    <Query
                        type="object" query={GET_BANNER} variables={{ key: 'homepage' }}
                        render={data => <Banner title={data.content}>
                            {/*<BannerImagesContainer/>*/}
                        </Banner>}
                    />
                    <Query
                        query={GET_GALLERIES}
                        render={(galleries: Gallery[]) => <GalleriesContainer galleries={galleries}/>}
                    />
                    <Query
                        query={GET_LATEST_POSTS}
                        render={(posts: Post[]) => <Cards title="Blog Posts↓">
                            {posts.map(post => <Card
                                key={post.id}
                                description={dayjs(post.createdAt).format('YYYY-MM-DD hh:mm')}
                                thumb={post?.thumb?.publicUrl}
                                url={`/posts/${post.key}`}
                                title={post.title}
                            />)}
                        </Cards>}
                    />
                </div>
                <Footer meta={meta}/>
            </Layout>
        </>;
    }
}
