import * as React from 'react';
import getConfig from "next/config";
import { MusicCard, MusicCards } from "../components/music-card.component";
import Head from "next/head";
import { Header } from "../components/header.component";
import { Button } from "../components/button.component";
import { Footer } from "../components/footer.component";
import { Layout } from "../components/layout.component";
import { useState } from "react";
import { Player } from "../components/player.component";

const { publicRuntimeConfig: { serverUrl } } = getConfig();

export async function getServerSideProps() {
    const res = await fetch(`${serverUrl}/nest-api/music`);
    const playlist = await res.json();
    const size = playlist.tracks.length;

    return { props: { size, tracks: playlist.tracks, index: Math.random() * (size - 10) } };
}

export default function MusicPage({ tracks, meta, index, size }) {
    const [start, updateStart] = useState(index);
    const [playingIndex, setPlayingIndex] = useState<number>(-1);
    const [current, setCurrent] = useState<any>({ id: '', dt: 0 });
    const list = tracks.slice(start, start + 10);

    const play = (track, index) => {
        setCurrent(track);
        setPlayingIndex(index);
    }

    const next = () => {
        const index = (playingIndex + 1) % 10;
        setPlayingIndex(index);
        setCurrent(list[index]);
    }

    const previous = () => {
        if (playingIndex === 0) {
            setPlayingIndex(9);
            setCurrent(list[9]);
            return;
        }
        const index = (Math.abs(playingIndex - 1)) % 10;
        setPlayingIndex(index);
        setCurrent(list[index]);
    }

    return <Layout>
        <Head>
            <title>My favorite music - {meta.title} - {meta.description}</title>
        </Head>
        <Header title={meta.title} avatar={meta?.avatar?.publicUrl}/>
        <MusicCards>
            {list.map((track, index) => <MusicCard
                key={track.id}
                onClick={() => play(track, index)}
                name={track?.name}
                singer={track?.ar[0]?.name}
                image={track?.al?.picUrl}/>)}
        </MusicCards>
        <div style={{ textAlign: 'center' }}>
            <Button onClick={() => updateStart(Math.random() * (size - 10))}>换一批</Button>
        </div>
        {current.id ? <Player
            onNext={() => next()}
            onPrevious={() => previous()}
            image={current?.al?.picUrl}
            name={current.name}
            artist={current?.ar ? current?.ar[0]?.name : ''}
            dt={current.dt}
            id={current.id}
        /> : ''}
        <Footer title={meta.title} icp={{ icp: meta.icp, url: meta.icp_url }}/>
    </Layout>
}
