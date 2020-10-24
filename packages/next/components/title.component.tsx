import * as React from 'react';
import styles from './title.component.module.less';
import { BaseProps } from "../interfaces/props.interface";

interface TitleProps extends BaseProps {
    children?: React.ReactNode | 'string';
    size?: 'large' | 'normal';
    as?: string;
}

export const Title = ({ children, size, as = 'span', id, style, className }: TitleProps) => {
    switch (as) {
        case 'h1':
            return <h1
                id={id}
                style={style}
                className={`${styles.title} ${className} ${size === 'large' ? styles.large : ''}`}>
                {children}
            </h1>;
        case 'h2':
            return <h2
                id={id}
                style={style}
                className={`${styles.title} ${className} ${size === 'large' ? styles.large : ''}`}>
                {children}
            </h2>;
        default:
            return <span
                id={id}
                style={style}
                className={`${styles.title} ${className} ${size === 'large' ? styles.large : ''}`}>
                {children}
            </span>
    }
};

