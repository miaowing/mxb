import * as React from 'react';

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
        style={{ outline: 'none', ...style }}
        className={`
            relative
            appearance-none
            bg-white
            rounded-lg
            text-gray-500
            border
            border-gray-300
            cursor-pointer
            text-2xl
            font-medium
            mt-16
            mb-8
            px-8
            py-4
            uppercase
            hover:text-primary
            hover:border-primary
            ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            ${className}
        `}
        onClick={() => loading || onClick()}>
        {children}
    </button>
)
