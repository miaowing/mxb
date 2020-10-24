import * as React from "react";
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

interface HeaderProps {
    title: string;
    avatar?: string;
}

export const Header = ({ title, avatar }) => (
    <AnimatedContainer>
        <header className={styles.header}>
            <a href="/" className={styles.logo}>
                {avatar ? <img src={avatar} alt={title}/> : ''}
                <Title as="h1" className={styles.title}>{title}</Title>
            </a>
            <Nav/>
        </header>
    </AnimatedContainer>
);
