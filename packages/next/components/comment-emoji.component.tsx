import React from 'react';
import styles from './comment-emoji.component.module.less';
import { Popover } from 'react-tiny-popover';
import { emojis } from "../constants/emoji.constants";
import { Icons } from "../constants/icons.constants";

export const Emoji = (Props: { handler: any }) => {
    const [emojiPopoverStatus, setEmojiPopoverStatus] = React.useState<boolean>(false);
    const toggleEmojiCard = () => setEmojiPopoverStatus(!emojiPopoverStatus);

    const emojiContent = () => {
        return (
            <div className={styles.emoji}>
                {emojis.map(cate => (
                    <div className={styles.section} key={'cate' + cate}>
                        <div className={styles.header}>
                            <b>{cate[0]}</b>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.container}>
                                {cate.slice(1).map(item => (
                                    <span
                                        key={'emoji' + item}
                                        onClick={() => {
                                            Props.handler(item);
                                            toggleEmojiCard();
                                        }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return (
        <Popover
            isOpen={emojiPopoverStatus}
            positions={['right']}
            content={emojiContent}
            onClickOutside={() => toggleEmojiCard()}>
            <button onClick={() => toggleEmojiCard()}>{Icons().emoji}</button>
        </Popover>
    );
};
