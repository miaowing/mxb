import * as React from 'react';
import styles from './music-card.component.module.less';
import { Icons } from "../constants/icons.constants";

export const MusicCards = ({ children }) => {

    return <div className={styles.cards}>
        {/*<div className={styles.title}>*/}
        {/*    <div>My favorite music</div>*/}
        {/*</div>*/}
        <div className={styles.children}>
            {children}
        </div>
    </div>
}

export const MusicCard = ({ image, name, singer, onClick }) => {
    return <div className={styles.card}>
        <div className={styles.cover} onClick={onClick}>
            <div className={`${styles.cover} ${styles.hover}`} style={{ backgroundImage: `url(${image})` }}>
                <button className={styles.button}>{Icons().play}</button>
            </div>
            <img src={image} alt={name}/>
        </div>
        <div className={styles.text}>
            <div className={styles.name}>
                <a onClick={onClick}>{name}</a>
            </div>
            <div className={styles.desc}>
                {singer}
            </div>
        </div>
    </div>
}
