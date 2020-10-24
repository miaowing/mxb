import * as React from 'react';
import styles from './post-card.component.module.less';
import dayjs from 'dayjs';

export const PostCards = ({ children, title }) => (
    <>
        <h2 className={styles.grid_title}>{title}</h2>
        <div className={styles.grids}>
            {children}
        </div>
    </>
);

export const PostCard = ({ post }) => (
    <article className={styles.card}>
        <a href={`/posts/${post.key}`}>
            {!!post.thumb && (
                <img src={post?.thumb?.publicUrl} alt={post.title}/>
            )}
        </a>
        <header>
            <h2 className={styles.title}>
                <a href={`/posts/${post.key}`} className={styles.link}>{post.title}</a>
            </h2>
            <div className={styles.meta}>{dayjs(post.createdAt).format('YYYY-MM-DD hh:mm')}</div>
        </header>
    </article>
)
