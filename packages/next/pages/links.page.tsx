import * as React from 'react';
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Footer } from "../components/footer.component";
import { BaseProps } from "../interfaces/props.interface";
import { Query } from "../components/query.component";
import { GET_LINKS } from "../graphql/links.gql";
import { Link } from "../interfaces/link.interface";
import { Card, Cards } from "../components/card.component";
import { Tag } from "../interfaces/tag.interface";
import { CommentContainer } from "../containers/comment.container";

export default function LinksPage({ meta }: BaseProps) {
    const handleLinks = (links: Link[]) => {
        const map = new Map<string, Tag & { links: Link[] }>();
        links.forEach(link => {
            link.tags.forEach(tag => {
                if (!map.has(tag.key)) {
                    map.set(tag.key, { ...tag, links: [] });
                }
                map.get(tag.key).links.push(link);
            })
        });
        const categories = [...map.values()];
        categories.sort((a, b) => a.sort > b.sort ? 1 : a.sort < b.sort ? -1 : 0);
        return categories;
    }

    return <>
        <Layout>
            <Head>
                <title>Links - {meta.title} - {meta.description}</title>
            </Head>
            <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
            <Query query={GET_LINKS} render={links => {
                return handleLinks(links).map(category => <Cards key={category.key} title={category.name}>
                    {category.links.map(link => <Card
                        key={link.name}
                        title={link.name}
                        url={link.url}
                        description={link.description}
                    />)}
                </Cards>)
            }}/>
            <div className="links-comment-wrap">
                <CommentContainer page="/links" meta={meta}/>
            </div>
            <Footer title={meta.title} icp={{ icp: meta.icp, url: meta.icp_url }}/>
        </Layout>
    </>;
}
