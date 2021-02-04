import * as React from 'react';
import Head from "next/head";
import { Layout } from "../containers/layout.container";
import { Header } from "../containers/header.container";
import { Footer } from "../containers/footer.container";
import { BaseProps } from "../interfaces/props.interface";
import { Query } from "../components/query.component";
import { Links, LinkItem } from "../components/link.component";
import { GET_INNER_LINKS } from "../graphql/links.gql";
import { CommentContainer } from "../containers/comment.container";

export default function LinksPage({ meta }: BaseProps) {
    return <>
        <Layout>
            <Head>
                <title>Links - {meta.title} - {meta.description}</title>
            </Head>
            <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                <Query query={GET_INNER_LINKS} render={links => <Links>
                    {links.map(link => <LinkItem
                        key={link.name}
                        title={link.name}
                        url={link.url}
                        thumb={link?.avatar?.publicUrl}
                        description={link.description}
                        category={link?.tags?.map(tag => <span className="mr-2">{tag.name}</span>)}
                    />)}
                </Links>}/>
                <div className="mx-8 md:mx-16 mt-16">
                    <CommentContainer page="/links" meta={meta}/>
                </div>
            </div>
            <Footer meta={meta}/>
        </Layout>
    </>;
}
