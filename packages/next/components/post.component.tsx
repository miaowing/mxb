import * as React from 'react';
import ReactMarkdown from "react-markdown";
import styles from './post.component.module.less';
import { prettyDate } from "../helpers/date.helper";

export const Post = ({ post }) => {
    let content = <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html_content }}/>;
    if (post.content) {
        content = <div className={styles.content}><ReactMarkdown source={post.content}/></div>;
    }
    return (
        <div className="blog-post-container">
            <article className={styles.post}>
                {!post.cover && (
                    <div className={styles.thumbnail}>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>{prettyDate(post.createdAt)}</div>
                    </div>
                )}
                {!!post.cover && (
                    <div className={styles.thumbnail} style={{ backgroundImage: `url(${post.cover?.publicUrl})` }}>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>{prettyDate(post.createdAt)}</div>
                    </div>
                )}
                {content}
                <div className={styles.tags}>
                    <div>{post.tags.map(tag => <span className={styles.tag}>{tag.name}</span>)}</div>
                </div>
            </article>
        </div>
    )
}
