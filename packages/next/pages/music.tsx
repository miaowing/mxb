import * as React from 'react';
import getConfig from "next/config";
import { MusicCard, MusicCards } from "../components/music-card.component";
import Head from "next/head";
import { Header } from "../containers/header.container";
import { Button } from "../components/button.component";
import { Footer } from "../containers/footer.container";
import { Layout } from "../containers/layout.container";
import { useState } from "react";
import { Player } from "../containers/player.container";
import { getMusicSource } from "../helpers/data.helper";

const { publicRuntimeConfig: { serverUrl } } = getConfig();

export async function getServerSideProps() {
    const res = await fetch(`${serverUrl}/nest-api/music`);
    const playlist = await res.json();

    return { props: { tracks: playlist.tracks } };
}

export default function MusicPage({ tracks, meta }) {
    const [playingIndex, setPlayingIndex] = useState<number>(-1);
    const [current, setCurrent] = useState<any>({ id: '', dt: 0 });
    const [localTracks, setTracks] = useState<any>([]);
    const list = localTracks.length > 0 ? localTracks : tracks;

    const play = (track, index) => {
        setCurrent(track);
        setPlayingIndex(index);
    }

    const next = () => {
        const index = (playingIndex + 1) % 10;
        setPlayingIndex(index);
        setCurrent(list[index]);
    }

    const updateTracks = async () => {
        const res = await fetch(`${serverUrl}/nest-api/music`);
        const playlist = await res.json();
        setTracks(playlist.tracks);
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
                singer={`${track?.ar[0]?.name} - ${getMusicSource(track?.kind)}`}
                image={track?.al?.picUrl}/>)}
        </MusicCards>
        <div style={{ textAlign: 'center' }} className={`random-btn ${current.id ? 'playing' : ''}`}>
            <Button style={{ marginTop: '0.5rem' }} onClick={() => updateTracks()}>换一批</Button>
        </div>
        <Player
            onNext={() => next()}
            onPrevious={() => previous()}
            image={current?.al?.picUrl}
            name={current?.name}
            artist={current?.ar ? current?.ar[0]?.name : ''}
            id={current?.id}
            kind={current?.kind}
        />
        {/*<Footer style={{ marginBottom: current.id ? 60 : 0 }} meta={meta}/>*/}
    </Layout>
}
