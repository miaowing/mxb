import React from 'react';
import styles from './gallery.component.module.less';
import { getGalleryInitStyle } from "../helpers/animation.helper";

export const Galleries = ({ children }) => (
    <div className={styles.galleries}>{children}</div>
);

export const GalleryItem = ({ index, title, description, image, url }) => (
    <figure id={`gallery-item-${index}`} className={styles.gallery} style={getGalleryInitStyle()}>
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
