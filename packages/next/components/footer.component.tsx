import * as React from 'react';
import styles from './footer.component.module.less';

export const Footer = ({ title }) => (
    <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} {title} &bull;
            {` Develop with `}
            <span role="img" aria-label="love">❤️</span>
            {` by `}
            <a href="https://github.com/miaowing">miaowing</a>
        </p>
    </footer>
)
