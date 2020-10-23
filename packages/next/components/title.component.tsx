import * as React from 'react';
import styles from './title.component.module.less';

interface TitleProps {
    children?: React.ReactNode | 'string';
    size?: 'large' | 'normal';
    as?: string;
}

export const Title = ({ children, size, as = 'span' }: TitleProps) => {
    switch (as) {
        case 'h1':
            return <h1 className={`${styles.title} ${size === 'large' ? styles.large : ''}`}>
                {children}
            </h1>;
        case 'h2':
            return <h2 className={`${styles.title} ${size === 'large' ? styles.large : ''}`}>
                {children}
            </h2>;
        default:
            return <span className={`${styles.title} ${size === 'large' ? styles.large : ''}`}>
                {children}
            </span>
    }
};

