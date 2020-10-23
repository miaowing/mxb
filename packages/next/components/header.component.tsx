import * as React from "react";
import Link from 'next/link';
import { Title } from "./title.component";
import posed from 'react-pose';
import styles from './header.component.module.less';
import { Nav } from "./nav.component";

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

export const Header = ({ title }) => (
    <AnimatedContainer>
        <header className={styles.header}>
            <Link href="/">
                <a><Title as="h1">{title}</Title></a>
            </Link>

            <Nav/>
        </header>
    </AnimatedContainer>
);
