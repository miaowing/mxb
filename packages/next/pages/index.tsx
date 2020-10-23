import * as React from 'react';
import { WithRouter } from "../decorators";
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

export interface IHomepageProps {
    lang: string;
}

@WithRouter()
export default class Homepage extends React.Component<IHomepageProps, any> {
    render() {
        return <>
            <Layout>
                <Query type="object" query={GET_SITE_METADATA} render={data => <>
                    <Head>
                        <title>{data.title}</title>
                    </Head>
                    <Header title={data.title}/>
                </>}/>
                <Query type="object" query={GET_BANNER} render={data => <Banner>{data.content}</Banner>}/>
                <Query query={GET_GALLERIES} render={(galleries: Gallery[]) => <Galleries>
                    {galleries.map(item => <GalleryItem
                        key={item.title}
                        title={item.title}
                        url={item.url}
                        description={item.description}
                        image={item?.thumb?.publicUrl}
                    />)}
                </Galleries>}/>
                <div style={{ height: '50vh' }}/>
            </Layout>
        </>;
    }
}
