import * as React from 'react';
import { Button } from "./button.component";
import { getBannerInitStyle } from "../helpers/animation.helper";

export const Banner = ({ title, children }) => {
    return <div className="p-8 sm:px-16">
        <div className="block md:flex justify-between items-center mb-24">
            <div className="max-w-6xl">
                <h2 style={getBannerInitStyle()}
                    className="block font-normal text-5xl leading-normal relative"
                    id="homepage-banner-title">
                    {title}
                </h2>
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
