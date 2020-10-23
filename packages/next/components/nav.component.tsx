import * as React from 'react';
import Link from 'next/link';
import styles from './nav.component.module.less';

export const Nav = () => (
    <nav className={styles.nav}>
        <ul>
            <li>
                <Link href="/contact"><a>Contact</a></Link>
            </li>
            <li>
                <Link href="/about"><a>About</a></Link>
            </li>
            <li>
                <a href="https://github.com/miaowing">GitHub</a>
            </li>
        </ul>
    </nav>
);
