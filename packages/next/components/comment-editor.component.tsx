import * as React from 'react';
import styles from './comment-editor.component.module.less';
import '../styles/markdown.less';
import { reactLocalStorage } from 'reactjs-localstorage';
import TextareaAutosize from 'react-textarea-autosize';
import MarkdownView from 'react-showdown';
import Floater from 'react-floater';
import insertTextAtCursor from 'insert-text-at-cursor';
import { markDownConfig } from "../constants/markdown-config.constants";
import { Icons } from "../constants/icons.constants";
import { Emoji } from "./comment-emoji.component";

interface CommentEditorProps {
    replyTo?: number | undefined;
    replyToName?: string | undefined;
    resetReplyTo?: () => void;
    onSubmit: (comment, callback?: Function) => void;
}

interface CommentInto {
    name: string;
    email: string;
    link?: string;
    ewr?: boolean;
}

interface Event {
    target: { value: React.SetStateAction<string> };
}

export const CommentEditor = ({ replyToName, replyTo, resetReplyTo, onSubmit }: CommentEditorProps) => {
    const getCommenterInfo = (type: string) => {
        if (reactLocalStorage.getObject('meowment-commenterInfo')) {
            return reactLocalStorage.getObject('meowment-commenterInfo')[type];
        } else {
            return type === 'ewr' ? undefined : '';
        }
    };
    const setCommenterInfo = (info: CommentInto) => {
        reactLocalStorage.setObject('meowment-commenterInfo', info);
    };

    const [commentName, setCommentName] = React.useState<string>(getCommenterInfo('name'));
    const [commentEmail, setCommentEmail] = React.useState<string>(getCommenterInfo('email'));
    const [commentLink, setCommentLink] = React.useState<string>(getCommenterInfo('link'));
    const [commentContent, setCommentContent] = React.useState<string>('');
    const [commentEwr, setCommentEwr] = React.useState<boolean>(getCommenterInfo('ewr') ?? true);
    const [previewStatus, setPreviewStatus] = React.useState<boolean>(false);

    const handleNameChange = (e: Event) => setCommentName(e.target.value);
    const handleEmailChange = (e: Event) => setCommentEmail(e.target.value);
    const handleLinkChange = (e: Event) => setCommentLink(e.target.value);
    const handleContentChange = (e: Event) => setCommentContent(e.target.value);
    const submit = async () => {
        await onSubmit({
            name: commentName,
            email: commentEmail,
            url: commentLink,
            content: commentContent,
            replyTo: replyTo,
            subscribe: commentEwr
        });

        setCommenterInfo({
            name: commentName,
            email: commentEmail,
            link: commentLink,
            ewr: commentEwr,
        });
        setCommentContent('');
    };

    const meowmentTextarea: any = React.useRef();
    const handleAddon = (content: string) => {
        insertTextAtCursor(meowmentTextarea.current, content);
    };

    return (
        <div className={styles.editor} id="comment-editor">
            <div className={styles.editor_top}>
                <input placeholder={commentName ?? 'Nickname'} onChange={handleNameChange}/>
                <input placeholder={commentEmail ?? 'Email'} onChange={handleEmailChange}/>
                <input placeholder={commentLink ?? 'Website'} onChange={handleLinkChange}/>
            </div>
            <div className={styles.editor_middle}>
                <TextareaAutosize
                    value={commentContent}
                    placeholder={'Please input your comment...'}
                    onChange={handleContentChange}
                    className={previewStatus ? styles.previewing : ''}
                    ref={meowmentTextarea}
                />
                {previewStatus ? (
                    <div className={`${styles.preview} markdown-body`}>
                        <MarkdownView
                            markdown={commentContent ? commentContent : ''}
                            options={markDownConfig}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={styles.editor_tools}>
                <div>
                    <Floater
                        offset={5}
                        eventDelay={0}
                        placement="top"
                        event="hover"
                        content="Reset reply">
                        <button onClick={resetReplyTo} className={replyTo ? styles.replying : ''}>
                            {replyTo ? Icons().resetFill : Icons().resetReply}
                            <em>{replyToName}</em>
                            <b>{Icons().cancel}</b>
                        </button>
                    </Floater>
                    <Floater
                        offset={5}
                        eventDelay={0}
                        placement="top"
                        event="hover"
                        content="Emoji">
                        <Emoji handler={handleAddon}/>
                    </Floater>
                    <Floater
                        placement="top"
                        event="hover"
                        content={commentEwr ? 'Unsubscribe' : 'Subscribe'}
                        offset={5}
                        eventDelay={0}>
                        <button onClick={() => setCommentEwr(!commentEwr)}>
                            {commentEwr ? Icons().email : Icons().emailFill}
                        </button>
                    </Floater>
                    <Floater
                        offset={5}
                        eventDelay={0}
                        placement="top"
                        event="hover"
                        content="Avatar">
                        <button>
                            <a href="https://cn.gravatar.com/support/what-is-gravatar" target="_blank">
                                {Icons().avatar}
                            </a>
                        </button>
                    </Floater>
                    <Floater
                        offset={5}
                        eventDelay={0}
                        placement="top"
                        event="hover"
                        content={previewStatus ? 'Close Preview' : 'Preview'}>
                        <button onClick={() => setPreviewStatus(!previewStatus)}>
                            {previewStatus ? Icons().markdownFill : Icons().markdown}
                        </button>
                    </Floater>
                </div>
                <div>
                    <button onClick={() => submit()}>
                        Commit
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CommentEditor;
