import * as React from 'react';
import styles from './music-card.component.module.less';

export const MusicCards = ({ children }) => {

    return <div className={styles.cards}>
        <div className={styles.title}>My favorite music</div>
        <div className={styles.children}>
            {children}
        </div>
    </div>
}

export const MusicCard = ({ image, name, url, singer }) => {
    return <div className={styles.card}>
        <div className={styles.cover}>
            <div className={`${styles.cover} ${styles.hover}`} style={{ backgroundImage: `url(${image})` }}/>
            <img src={image} alt={name}/>
        </div>
        <div className={styles.text}>
            <div className={styles.name}>
                <a href={url}>{name}</a>
            </div>
            <div className={styles.desc}>
                {singer}
            </div>
        </div>
    </div>
}
