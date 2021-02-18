import * as React from "react";
import posed from 'react-pose';
import { Nav } from "./nav.container";

const AnimatedContainer = posed.div({
    enter: {
        y: 0,
        transition: {
            ease: 'easeInOut',
        },
    },
    exit: {
        y: '-100%',
        transition: {
            ease: 'easeInOut',
        },
    },
});

export const Header = ({ title, avatar }) => (
    <AnimatedContainer>
        <header className="flex justify-between items-center p-8 sm:p-16">
            <a href="/" className="flex justify-between items-center">
                {avatar ? <img src={avatar} alt={title} className="w-24 h-24 mr-8 rounded-full"/> : ''}
                <h1 className="hidden sm:block md:block text-3xl relative text-gray-500 font-medium leading-normal">
                    {title}
                </h1>
            </a>
            <Nav/>
        </header>
    </AnimatedContainer>
);
