import TWEEN from '@tweenjs/tween.js';

function animate(time) {
    window.requestAnimationFrame(animate)
    TWEEN.update(time)
}

if (typeof window !== "undefined") {
    window.requestAnimationFrame(animate);
}

export const getTween = (params: any) => new TWEEN.Tween(params);

export const getBannerInitStyle = () => ({ left: -100, opacity: 0 });

export const getGalleryInitStyle = () => ({ bottom: -100, opacity: 0 });

export const initHomepageBannerAnimation = () => {
    const items = [
        document.getElementById('homepage-banner-title'),
        document.getElementById('homepage-banner-button'),
        document.getElementById('homepage-banner-button-music'),
    ].filter(Boolean);
    items.forEach((item, index) => {
        const tween = getTween(getBannerInitStyle());
        tween.to({ left: 0, opacity: 1 }, 600)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(({ left, opacity }) => {
                item.style.setProperty('left', `${left}px`);
                item.style.setProperty('opacity', `${opacity}`);
            })
            .delay(index * 100)
            .start();
    });
}

export const initGalleryAnimation = () => {
    const items = [
        document.getElementById('gallery-item-0'),
        document.getElementById('gallery-item-1'),
        document.getElementById('gallery-item-2')
    ].filter(Boolean);
    items.forEach((item, index) => {
        const tween = getTween(getGalleryInitStyle());
        tween.to({ bottom: 0, opacity: 1 }, 600)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(({ bottom, opacity }) => {
                item.style.setProperty('bottom', `${bottom}px`);
                item.style.setProperty('opacity', `${opacity}`);
            })
            .delay(index * 100 + 100)
            .start();
    });
}
