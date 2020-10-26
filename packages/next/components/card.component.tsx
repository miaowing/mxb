import * as React from 'react';
import styles from './card.component.module.less';

export const Cards = ({ children, title }) => (
    <div className={styles.cards}>
        <h2 className={styles.grid_title}>{title}</h2>
        <div className={styles.grids}>
            {children}
        </div>
    </div>
);

interface PostCardProps {
    url?: string;
    title?: string;
    thumb?: string;
    description?: string;
}

export const Card = ({ url, thumb, title, description }: PostCardProps) => {
    const isExternalUrl = url?.indexOf('http') === 0;
    return <article className={styles.card}>
        <a href={url} target={isExternalUrl ? '_blank' : ''}>
            {!!thumb && (
                <img src={thumb} alt={title}/>
            )}
        </a>
        <header>
            <h2 className={styles.title}>
                <a href={url} target={isExternalUrl ? '_blank' : ''} className={styles.link}>{title}</a>
            </h2>
            <div className={styles.meta}>{description}</div>
        </header>
    </article>;
}
