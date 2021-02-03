import * as React from 'react';
import ReactSlider from 'react-slider'
import { Howl, Howler } from 'howler';
import { Icons } from "../constants/icons.constants";
import * as Lyrics from 'lyrics.js';
import { WithToast } from "../decorators/with-toast.decorator";

interface PlayerProps {
    id: string;
    dt: number;
    image: string;
    name: string;
    artist: string;
    onPrevious: () => void;
    onNext: () => void;
    addToast?: any;
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
        if (this.props.dt !== props.dt && props.dt) {
            try {
                this.setState({ playing: false });
                Howler.unload();
            } catch (e) {

            }

            this.play(props.id, props.dt);
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
                    const index = this.lyrics.select(progress);
                    const text = this.lyrics.getLyric(index);
                    if (text !== this.state.lrc && text) {
                        this.setState({ lrc: text.text });
                    }
                }
            }
        }, 100);
        if (this.props.id && this.props.dt) {
            this.play(this.props.id, this.props.dt);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    play(id: string, dt: number) {
        const { addToast } = this.props;
        this.howler = new Howl({
            src: [`https://music.163.com/song/media/outer/url?id=${id}.mp3`],
            html5: true,
            autoplay: true,
            format: ["mp3"],
            onloaderror: () => {
                addToast('该资源暂时不可用', { appearance: 'error', autoDismiss: true });
                this.props.onNext();
            },
            onend: () => this.props.onNext(),
            onplay: () => this.setState({ playing: true }),
            onpause: () => this.setState({ playing: false }),
        });

        const max = (dt / 1000);
        this.setState({ max: max > 1 ? max - 1 : max });
        fetch('https://mxb.cc/apis/music/lyric?id=' + id).then(async res => {
            const body = await res.json();
            if (!body.nolyric) {
                const lyric = body?.lrc?.lyric;
                console.log(lyric);
                this.lyrics = new Lyrics(lyric);
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
        const { image, name, artist, onPrevious, onNext } = this.props;
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
                        <div className="artist">{artist}</div>
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
