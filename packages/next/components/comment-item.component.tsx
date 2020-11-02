import { Icons } from "../constants/icons.constants";
import { prettyDate } from "../helpers/date.helper";
import MarkdownView from "react-showdown";
import { markDownConfig } from "../constants/markdown-config.constants";
import md5 from 'js-md5';
import styles from './comment-item.component.module.less';
import { BaseProps } from "../interfaces/props.interface";
import * as React from "react";
import { Base64 } from 'js-base64';

interface CommentItemProps extends BaseProps {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
    replyTo?: boolean;
    url?: string;
    replyToUrl?: string;
    date: string;
    content: string;
    onReply?: (id, name) => void;
}

export const CommentItem = (
    {
        id,
        name,
        email,
        isAdmin,
        url,
        date,
        content,
        replyTo,
        replyToUrl,
        onReply,
        children
    }: CommentItemProps
) => {
    const onClick = () => {
        onReply(id, name);
        location.href = '#comment-editor'
    }
    return <li className={styles.comment_item} id={id}>
        <div className={styles.comment_wrap} onClick={() => onClick()}>
            <div className={styles.avatar}>
                <img src={`https://cdn.v2ex.com/gravatar/${md5(email)}?d=mp`} alt={name}/>
                {isAdmin ? <div className={styles.admin_badge}>{Icons().admin}</div> : ''}
            </div>
            <div className={styles.title}>
                <h5>
                    {
                        url ?
                            <a href={`/nest-api/links/${Base64.encode(url)}`} target="_blank">{name}</a> :
                            <span>{name}</span>
                    }
                    {
                        replyTo ?
                            <span className={styles.reply_to}>
                                <span>reply to</span>
                                {
                                    replyToUrl ?
                                        <a href={`/nest-api/links/${Base64.encode(replyToUrl)}`} target="_blank">
                                            {replyTo}
                                        </a> :
                                        <span>{replyTo}</span>
                                }
                            </span> : ''
                    }
                    <span> · </span>
                    <b>{prettyDate(date)}</b>
                    <em className={styles.reply_icon}>{Icons().reply}</em>
                </h5>
                <div className={styles.content}>
                    <MarkdownView markdown={content} options={markDownConfig}/>
                </div>
            </div>
        </div>
        <div>
            <ul className={styles.reply_list}>
                {children}
            </ul>
        </div>
    </li>;
}
