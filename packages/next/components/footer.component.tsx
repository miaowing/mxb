import * as React from 'react';
import styles from './footer.component.module.less';
import { BaseProps } from "../interfaces/props.interface";
import { Metadata } from "../interfaces/meta.interface";
import { useState } from "react";
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useQuery } from "@apollo/client";
import { GET_GLOBAL_LINKS } from "../graphql/links.gql";

interface FooterProps extends BaseProps {
    meta: Metadata;
}

export const Footer = ({ meta, style }: FooterProps) => {
    const { error, data } = useQuery(GET_GLOBAL_LINKS);
    if (error) {
        return <div>{error}</div>;
    }

    const links = data?.allLinks ?? [];
    const { addToast } = useToasts();
    const [email, setEmail] = useState('');
    const subscribe = async () => {
        try {
            await axios.post('/nest-api/subscriptions', { email });
            addToast('订阅成功，如需取消请联系管理员', { appearance: 'success', autoDismiss: true });
        } catch (e) {
            addToast(e?.response?.data?.message ?? e.message, { appearance: 'error', autoDismiss: true });
        }
    }

    return (
        <footer className={styles.footer} style={style}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className="subscription">
                        <label>Stay Tuned</label>
                        <p>Be the first to visit new post.</p>
                        <form target="_blank">
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                className="email"
                                placeholder="Email Address"/>
                            <button type="button" name="subscribe" className="button green" onClick={subscribe}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div className={styles.sns}>
                        <a className="weibo" href="http://weibo.com/zfeng217" target="_blank">
                            <span>Weibo</span>
                        </a>
                        <a className="github" href="http://github.com/miaowing/mxb" target="_blank">
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
                {meta?.qrcode?.publicUrl ? <div className={styles.right}>
                    <span>On WeChat App</span>
                    <a className={styles.qrcode} href={meta?.qrcode?.publicUrl} target="new">
                        <img src={meta?.qrcode?.publicUrl} className="img" width="80"/>
                    </a>
                </div> : ''}
                <div className={styles.bottom}>
                    <span>Built by</span>
                    <span> </span>
                    <a href="http://github.com/miaowing">Miaowing</a>
                    <span> </span>
                    <span>with ♥</span>
                    <div>
                        {links.map(link => <a key={link.name} href={link.url} target="_blank">{link.name}</a>)}
                    </div>
                </div>
            </div>
        </footer>
    )
}
