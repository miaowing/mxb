import * as React from 'react';
import styles from './button.component.module.less';

interface Button {
    children?: any;
    onClick?: () => void;
    id?: string;
    style?: React.CSSProperties;
    className?: string;
}

export const Button = ({ children, onClick, id, style, className }: Button) => (
    <button id={id} style={style} className={`${styles.button} ${className}`} onClick={onClick}>{children}</button>
)
