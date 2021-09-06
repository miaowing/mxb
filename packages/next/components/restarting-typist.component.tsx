import * as React from 'react';
import { useEffect, useState } from "react";
import Typist from 'react-typist';

type RestartingTypistProps = {
    children?: any,
};

export const RestartingTypist = (props: RestartingTypistProps) => {
    const [done, setDone] = useState(false);
    const { children } = props;

    useEffect(() => {
        if (done) {
            setTimeout(() => setDone(false), 250);
        }
    });

    if (done) {
        return <p/>;
    }

    return (
        <Typist onTypingDone={() => setDone(true)} style={{ display: 'inline' }}>
            {children}
        </Typist>
    );
};
