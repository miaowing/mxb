import React from 'react';
import styles from './box.component.module.less';

export const Box = ({ children }) => <div className={styles.box}>{children}</div>;

