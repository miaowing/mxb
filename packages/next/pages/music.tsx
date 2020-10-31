import * as React from 'react';
import getConfig from "next/config";
import { MusicCard, MusicCards } from "../components/music-card.component";
import Head from "next/head";
import { Header } from "../components/header.component";
import { Footer } from "../components/footer.component";
import { Layout } from "../components/layout.component";
import { useState } from "react";

const { publicRuntimeConfig: { serverUrl } } = getConfig();

export async function getServerSideProps() {
    const res = await fetch(`${serverUrl}/nest-api/music`);
    const playlist = await res.json();

    return { props: { tracks: playlist.tracks } };
}

export default function MusicPage({ tracks, meta }) {
    const size = tracks.length;
    const [start, updateRange] = useState(parseInt(String(Math.random() * (size - 10))));
    const list = tracks.slice(start, start + 10);

    return <Layout>
        <Head>
            <title>Links - {meta.title} - {meta.description}</title>
        </Head>
        <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
        <MusicCards>
            {list.map(track => <MusicCard
                key={track.id}
                url={""}
                name={track?.al?.name}
                singer={track?.ar[0]?.name}
                image={track?.al?.picUrl}/>)}
        </MusicCards>
        <Footer title={meta.title} icp={{ icp: meta.icp, url: meta.icp_url }}/>
    </Layout>
}
