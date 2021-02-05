import * as React from 'react';
import ReactSlider from 'react-slider'
import { Howl, Howler } from 'howler';
import { Icons } from "../constants/icons.constants";
import * as Lyrics from 'lyrics.js';
import { WithToast } from "../decorators/with-toast.decorator";
import { getMusicSource } from "../helpers/data.helper";

interface PlayerProps {
    id: string;
    image: string;
    name: string;
    artist: string;
    onPrevious: () => void;
    onNext: () => void;
    addToast?: any;
    kind?: string;
}

@WithToast()
export class Player extends React.Component<PlayerProps, any> {
    private howler: Howl;
    private timer;
    private lyrics;

    state = {
        progress: 0,
        max: 100,
        playing: false,
        lrc: '',
    }

    componentWillReceiveProps(props: Readonly<PlayerProps>) {
        if (this.props.id !== props.id && props.id) {
            try {
                this.setState({ playing: false });
                Howler.unload();
            } catch (e) {

            }

            this.play(props.id, props.kind);
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (!this.howler.playing()) {
                return;
            }
            const progress = this.howler?.seek();
            if (progress) {
                this.setState({ progress });

                if (this.lyrics) {
                    try {
                        const index = this.lyrics.select(progress);
                        const text = this.lyrics.getLyric(index);
                        if (text !== this.state.lrc && text) {
                            this.setState({ lrc: text.text });
                        }
                    } catch (e) {
                        this.lyrics = null;
                        this.setState({ lrc: '' });
                    }
                }
            }
        }, 100);
        if (this.props.id) {
            this.play(this.props.id, this.props.kind);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    play(id: string, kind: string) {
        const { addToast } = this.props;

        this.howler = new Howl({
            src: [`/nest-api/music/kinds/${kind ?? 'netease'}/songs/${id}`],
            html5: true,
            autoplay: true,
            format: ["mp3", 'wav', 'mp4'],
            onloaderror: () => {
                addToast('该资源暂时不可用', { appearance: 'error', autoDismiss: true });
                this.props.onNext();
            },
            onload: () => {
                const max = this.howler.duration();
                this.setState({ max: max > 1 ? max - 1 : max });
            },
            onend: () => {
                this.props.onNext();
            },
            onplay: () => this.setState({ playing: true }),
            onpause: () => this.setState({ playing: false }),
        });

        fetch(`/nest-api/music/kinds/${kind ?? 'netease'}/songs/${id}/lyric`).then(async res => {
            const body = await res.json();
            if (!body.nolyric) {
                const lyric = body?.lyric;
                console.log(lyric);
                this.setState({ lrc: '' });
                this.lyrics = lyric ? new Lyrics(lyric) : null;
            }
        });
    }

    pauseOrPlay() {
        if (this.state.playing) {
            this.howler.pause();
            this.setState({ playing: false });
        } else {
            this.howler.play();
            this.setState({ playing: true });
        }
    }

    render() {
        const { image, name, artist, onPrevious, onNext, kind } = this.props;
        return <div className="player">
            <ReactSlider
                step={0.01}
                onBeforeChange={() => {
                    if (this.howler.playing()) {
                        this.howler.pause();
                    }
                }}
                onChange={val => this.setState({ progress: val })}
                onAfterChange={val => {
                    this.howler.seek(val);
                    this.howler.play();
                }}
                value={this.state.progress}
                max={this.state.max}/>
            <div className="footer">
                <div className="playing">
                    <img src={image} alt={name}/>
                    <div className="info">
                        <div className="name">{name}</div>
                        <div className="artist">{artist} - {getMusicSource(kind)}</div>
                    </div>
                </div>
                <div className="controls">
                    <button className="button" onClick={() => onPrevious()}>
                        {Icons().previous}
                    </button>
                    <button className="button play" onClick={() => this.pauseOrPlay()}>
                        {this.state.playing ? Icons().pause : Icons().playing}
                    </button>
                    <button className="button" onClick={() => onNext()}>
                        {Icons().next}
                    </button>
                </div>
                <div className="controls">
                    <div className="lrc">
                        {this.state.lrc}
                    </div>
                </div>
            </div>
        </div>
    }
}
