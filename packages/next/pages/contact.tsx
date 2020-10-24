import * as React from 'react';
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Query } from "../components/query.component";
import { GET_SITE_METADATA } from "../graphql/metadata.gql";
import { Contact } from "../components/contact.component";
import { Footer } from "../components/footer.component";

export default class ContactPage extends React.Component<any, any> {
    render() {
        return <>
            <Layout>
                <Query type="object" query={GET_SITE_METADATA} render={site => <>
                    <Head>
                        <title>About - {site.title}</title>
                    </Head>
                    <Header title={site.title}/>
                    <Contact/>
                    <Footer title={site.title}/>
                </>}/>
            </Layout>
        </>;
    }
}
