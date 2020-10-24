import * as React from 'react';
import router from 'next/router';
import { Title } from "./title.component";
import styles from './banner.component.module.less';
import { Button } from "./button.component";
import { useMount } from "react-use";
import { getBannerInitStyle, initHomepageBannerAnimation } from "../helpers/animation.helper";

export const Banner = ({ children }) => {
    useMount(() => {
        initHomepageBannerAnimation();
    });
    return <div className={styles.banner}>
        <Title
            style={getBannerInitStyle()}
            id="homepage-banner-title" size="large" as="h2">
            {children}
        </Title>
        <Button
            style={getBannerInitStyle()}
            id="homepage-banner-button" onClick={() => router.push("/contact")}>
            Contact me
        </Button>
    </div>;
};
