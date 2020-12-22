import * as React from 'react';
import { Title } from "./title.component";
import styles from './banner.component.module.less';
import { Button } from "./button.component";
import { getBannerInitStyle } from "../helpers/animation.helper";

export const Banner = ({ title, children }) => {
    return <div className={styles.banner}>

        <div className={styles.welcome}>
            <div className={styles.text}>
                <Title
                    style={getBannerInitStyle()}
                    id="homepage-banner-title" size="large" as="h2">
                    {title}
                </Title>
                <Button
                    style={getBannerInitStyle()}
                    id="homepage-banner-button" onClick={() => location.href = '/contact'}>
                    Contact me
                </Button>
            </div>
            {children}
        </div>
    </div>;
};
