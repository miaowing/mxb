import * as React from 'react';
import styles from './button.component.module.less';

interface Button {
    children?: any;
    onClick?: () => void;
    id?: string;
    style?: React.CSSProperties;
    className?: string;
    loading?: boolean;
}

export const Button = ({ children, onClick, id, style, className, loading }: Button) => (
    <button
        type="button"
        id={id}
        style={style}
        className={`${styles.button} ${className} ${loading ? styles.loading : ''}`}
        onClick={() => loading || onClick()}>
        {children}
    </button>
)
