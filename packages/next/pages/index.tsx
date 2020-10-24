import * as React from 'react';
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Query } from "../components/query.component";
import { GET_SITE_METADATA } from "../graphql/metadata.gql";
import { GET_GALLERIES } from "../graphql/gallery.gql";
import { Galleries, GalleryItem } from "../components/gallery.component";
import { Gallery } from "../interfaces/gallery.interface";
import { GET_BANNER } from "../graphql/banner.gql";
import { Banner } from "../components/banner.component";
import { GET_LATEST_POSTS } from "../graphql/post.gql";
import { Footer } from "../components/footer.component";
import { PostCard, PostCards } from "../components/post-card.component";
import { initGalleryAnimation, initHomepageBannerAnimation } from "../helpers/animation.helper";


export default class Homepage extends React.Component<any, any> {
    render() {
        return <>
            <Layout>
                <Query
                    type="object" query={GET_SITE_METADATA}
                    render={site => <>
                        <Head>
                            <title>{site.title}</title>
                        </Head>
                        <Header title={site.title} avatar={site?.avatar?.publicUrl}/>
                        <Query
                            type="object" query={GET_BANNER} variables={{ key: 'homepage' }}
                            onCompleted={() => initHomepageBannerAnimation()}
                            render={data => <Banner>{data.content}</Banner>}/>
                        <Query
                            query={GET_GALLERIES}
                            onCompleted={() => initGalleryAnimation()}
                            render={(galleries: Gallery[]) => <Galleries>
                                {galleries.map((item, index) => <GalleryItem
                                    index={index}
                                    key={item.title}
                                    title={item.title}
                                    url={item.url}
                                    description={item.description}
                                    image={item?.thumb?.publicUrl}
                                />)}
                            </Galleries>}/>
                        <Query query={GET_LATEST_POSTS} render={posts => <PostCards title="Blog Posts↓">
                            {posts.map(post => <PostCard key={post.id} post={post}/>)}
                        </PostCards>}/>
                        <Footer title={site.title} icp={{ icp: site.icp, url: site.icp_url }}/>
                    </>}/>
            </Layout>
        </>;
    }
}
