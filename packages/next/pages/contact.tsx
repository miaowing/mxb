import * as React from 'react';
import Head from "next/head";
import { Layout } from "../containers/layout.container";
import { Header } from "../containers/header.container";
import { Contact } from "../containers/contact.container";
import { Footer } from "../containers/footer.container";
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useState } from "react";
import { BaseProps } from "../interfaces/props.interface";

export default function ContactPage({ meta }: BaseProps) {
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
                <title>Contact - {meta.title} - {meta.description}</title>
            </Head>
            <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
            <Contact loading={sending} onSubmit={values => submit(values)} meta={meta}/>
            <Footer meta={meta}/>
        </Layout>
    </>;
}
