import * as React from 'react';
import Link from 'next/link';
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
        <Link href={`/posts/${post.key}`}>
            <a>
                {!!post.thumb && (
                    <img src={post?.thumb?.publicUrl} alt={post.title}/>
                )}
            </a>
        </Link>
        <header>
            <h2 className={styles.title}>
                <Link href={`/posts/${post.key}`}>
                    <a className={styles.link}>{post.title}</a>
                </Link>
            </h2>
            <div className={styles.meta}>{dayjs(post.createdAt).format('YYYY-MM-DD hh:mm')}</div>
        </header>
    </article>
)
