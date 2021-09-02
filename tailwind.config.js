module.exports = {
    purge: [
        './components/**/*.{js,ts,jsx,tsx}',
        './packages/next/components/**/*.{js,ts,jsx,tsx}',
        './containers/**/*.{js,ts,jsx,tsx}',
        './packages/next/containers/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './packages/next/pages/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                'percent-49': '49%',
                '104': '26rem',
            },
            height: {
                '104': '26rem',
            },
            flex: {
                '2': '2 2 0%',
            },
            outline: {
                0: '0',
                null: 'none',
            },
            fontSize: {
                '100xl': '1.6rem',
            },
            minWidth: {
                'footer': '27rem',
                'avatar-card': '10rem',
            },
            maxWidth: {
                'post': '86rem',
            },
            minHeight: {
                'banner': '38rem',
                'comment': '13rem',
                'avatar-card-banner': '12rem',
            },
            boxShadow: {
                'contact': '0 0 50px 0 rgba(0, 0, 0, .2)',
                'post': '0 0 30px #d5d5d5',
            },
            lineHeight: {
                footer: '180%',
                full: '100%',
                11: '2.75rem',
                12: '3rem',
                13: '3.25rem',
                14: '3.5rem',
                15: '3.75rem',
                16: '4rem',
                17: '4.25rem',
                18: '4.5rem',
                19: '4.75rem',
                20: '5rem',
                21: '5.25rem',
                22: '5.5rem',
                23: '5.75rem',
                24: '6rem',
                25: '6.25rem',
                26: '6.5rem'
            },
            colors: {
                layer: '#1A153A',
                footer: '#18142e',
                primary: '#18142e',
                contact: '#d0414e',
                'footer-text': 'hsla(0, 0%, 100%, 0.6)',
                'gallery-button': 'rgba(255, 255, 255, 0.3)',
                'gallery-button-hover': 'rgba(255, 255, 255, 0.6)',
                'gallery-button-hover-bg': 'rgba(255, 255, 255, 0.1)',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
