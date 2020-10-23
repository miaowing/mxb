import * as React from 'react';
import styles from './button.component.module.less';

export const Button = ({ children }) => <button className={styles.button}>{children}</button>
