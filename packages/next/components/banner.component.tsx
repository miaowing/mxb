import * as React from 'react';
import { Title } from "./title.component";
import styles from './banner.component.module.less';
import { Button } from "./button.component";

export const Banner = ({ children }) => <div className={styles.banner}>
    <Title size="large" as="h2">{children}</Title>
    <Button>Contact me</Button>
</div>;
