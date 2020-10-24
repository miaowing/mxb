import * as React from 'react';
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Query } from "../components/query.component";
import { GET_SITE_METADATA } from "../graphql/metadata.gql";
import { Contact } from "../components/contact.component";
import { Footer } from "../components/footer.component";
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useState } from "react";

export default ({}) => {
    const [sending, updateSending] = useState(false);
    const { addToast } = useToasts();
    const submit = async (values) => {
        updateSending(true);
        try {
            await axios.post('/email-app/messages', values);
            addToast('Send Successful', { appearance: 'success' });
        } catch (e) {
            addToast(e.message, { appearance: 'error' });
        }
        updateSending(false);
    }
    return <>
        <Layout>
            <Query type="object" query={GET_SITE_METADATA} render={site => <>
                <Head>
                    <title>About - {site.title}</title>
                </Head>
                <Header title={site.title}/>
                <Contact loading={sending} onSubmit={values => submit(values)}/>
                <Footer title={site.title} icp={{ icp: site.icp, url: site.icp_url }}/>
            </>}/>
        </Layout>
    </>;
}
