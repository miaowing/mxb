import * as React from 'react';
import { Button } from "./button.component";
import { getBannerInitStyle } from "../helpers/animation.helper";
import { RestartingTypist } from "./restarting-typist.component";
import Typist from 'react-typist';

export const Banner = ({ title, children }) => {
    return <div className="p-8 sm:px-16">
        <div className="block md:flex justify-between items-center mb-24">
            <div className="max-w-5xl">
                <h2 style={getBannerInitStyle()}
                    className="block font-normal text-5xl leading-normal relative"
                    id="homepage-banner-title">
                    <span>I’m an JavaScript & TypeScript developer, who loves </span>
                    <span>
                        <RestartingTypist>
                            <span>challenges</span>
                            <Typist.Backspace count={10} delay={1000}/>
                            <span>open source</span>
                            <Typist.Backspace count={11} delay={1000}/>
                            <span>newest technologies</span>
                            <Typist.Backspace count={19} delay={1000}/>
                            <span>programming</span>
                            <Typist.Backspace count={11} delay={2000}/>
                        </RestartingTypist>
                    </span>
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
