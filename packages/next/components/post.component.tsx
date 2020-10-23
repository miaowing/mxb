import * as React from 'react';
import ReactMarkdown from "react-markdown";
import styles from './post.component.module.less';

export const Post = ({ post }) => {
    let content = <article dangerouslySetInnerHTML={{ __html: post.html_content }}/>;
    if (post.content) {
        content = <article><ReactMarkdown source={post.content}/></article>;
    }
    return <section className={styles.post}>
        {content}
    </section>
}
