import * as React from 'react';
import styles from './nav.component.module.less';

export const Nav = () => (
    <nav className={styles.nav}>
        <ul>
            <li><a href="/posts">Blog</a></li>
            <li className={styles.github}><a href="/music">Music</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
            <li className={styles.github}><a href="/guest-book">GuestBook</a></li>
            <li><a href="/links">Links</a></li>
        </ul>
    </nav>
);
