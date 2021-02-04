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
                13: '4rem',
            },
            colors: {
                layer: '#1A153A',
                footer: '#18142e',
                primary: '#18142e',
                contact: '#d0414e',
                'footer-text': 'hsla(0, 0%, 100%, 0.6)',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
