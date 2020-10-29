import * as React from 'react';
import Head from "next/head";
import { Layout } from "../components/layout.component";
import { Header } from "../components/header.component";
import { Contact } from "../components/contact.component";
import { Footer } from "../components/footer.component";
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useState } from "react";
import { BaseProps } from "../interfaces/props.interface";

export default ({ meta }: BaseProps) => {
    const [sending, updateSending] = useState(false);
    const { addToast } = useToasts();
    const submit = async (values) => {
        updateSending(true);
        try {
            await axios.post('/nest-api/contacts', values);
            addToast('Send Successful', { appearance: 'success', autoDismiss: true });
        } catch (e) {
            addToast(e?.response?.data?.message ?? e.message, { appearance: 'error', autoDismiss: true });
        }
        updateSending(false);
    }
    return <>
        <Layout>
            <Head>
                <title>About - {meta.title} - {meta.description}</title>
            </Head>
            <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
            <Contact loading={sending} onSubmit={values => submit(values)}/>
            <Footer title={meta.title} icp={{ icp: meta.icp, url: meta.icp_url }}/>
        </Layout>
    </>;
}
