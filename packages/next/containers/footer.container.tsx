import * as React from 'react';
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

    return <footer
        className="inline-block bg-footer text-white py-20 mt-16 w-full leading-footer text-100xl text-footer-text"
        style={style}>
        <div className="mx-8 md:mx-16">
            <div className="inline-block">
                <div className="subscription">
                    <label className="block m-0 w-full text-3xl leading-full">Stay Tuned</label>
                    <p className="text-100xl my-4 leading-full">Be the first to visit new post.</p>
                    <form target="_blank" className="m-0 p-0 max-w-full w-full leading-13">
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            className="
                                text-white float-left mr-4 rounded transition-colors duration-200 min-w-footer
                                shadow-none outline-0 border border-solid border-footer-text text-100xl
                                font-medium appearance-none h-16 mb-4 w-96 leading-13 bg-transparent px-4 py-1.5
                            "
                            placeholder="Email Address"/>
                        <button
                            type="button"
                            name="subscribe"
                            className="
                                rounded border border-white border-solid font-bold outline-0 uppercase px-12
                                text-100xl transition-all duration-100 ease-in-out text-white h-16 cursor-pointer
                            "
                            onClick={subscribe}>
                            Subscribe
                        </button>
                    </form>
                </div>
                <div className="mt-12 text-white">
                    <a className="mr-8 hover:text-white" href="http://weibo.com/zfeng217" target="_blank">
                        <span className="text-100xl">Weibo</span>
                    </a>
                    <a className="mr-8 hover:text-white" href="http://github.com/miaowing/mxb" target="_blank">
                        <span className="text-100xl">GitHub</span>
                    </a>
                </div>
            </div>
            {meta?.qrcode?.publicUrl ? <div className="float-none md:float-right">
                <span>On WeChat App</span>
                <a
                    className="text-100xl block mt-6 mb-0 mx-0 w-32 md:mx-auto relative"
                    href={meta?.qrcode?.publicUrl} target="new">
                    <img src={meta?.qrcode?.publicUrl} className="img" width="80"/>
                </a>
            </div> : ''}
            <div className="inline-block text-100xl mt-8 w-full">
                <span>Built by</span>
                <span> </span>
                <a className="text-white hover:text-white" href="http://github.com/miaowing">Miaowing</a>
                <span> </span>
                <span>with ♥</span>
                <div className="float-none text-white">
                    {links.map(link =>
                        <a className="mr-12 hover:text-white" key={link.name} href={link.url} target="_blank">
                            <span dangerouslySetInnerHTML={{ __html: link.name }}/>
                        </a>
                    )}
                </div>
            </div>
        </div>
    </footer>
}
