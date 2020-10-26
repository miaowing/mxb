import * as React from 'react';
import styles from './nav.component.module.less';

export const Nav = () => (
    <nav className={styles.nav}>
        <ul>
            <li><a href="/posts">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/links">Links</a></li>
            <li><a href="https://github.com/miaowing" target="_blank">GitHub</a></li>
        </ul>
    </nav>
);
