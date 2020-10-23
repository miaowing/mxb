import React from 'react';
import styles from './gallery.component.module.less';
import Link from 'next/link';

export const Galleries = ({ children }) => (
    <div className={styles.gallery}>{children}</div>
);

export const GalleryItem = ({ title, description, image, url }) => (
    <figure>
        <div className={styles.wrapper}>
            <div className={styles.layer}/>
            <img className={styles.image} src={image} alt={title}/>
        </div>
        <figcaption>
            <a href={url} className={styles.title}>{title}</a>
            <p className={styles.copy}>{description}</p>
        </figcaption>
    </figure>
);
