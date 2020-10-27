import * as React from 'react';
import { CommentItem } from "../components/comment-item.component";
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../graphql/comment.gql";
import { useToasts } from 'react-toast-notifications';
import { Metadata } from "../interfaces/meta.interface";

const CommentEditor = dynamic(() => import("../components/comment-editor.component"), {
    ssr: false,
});

interface CommentContainerProps {
    page: string;
    meta: Metadata;
}

export const CommentContainer = ({ page, meta }: CommentContainerProps) => {
    const { error, data, refetch } = useQuery(GET_COMMENTS, { variables: { page } });
    if (error) {
        return <div>{error}</div>;
    }

    const comments = data?.allComments ?? [];
    const replies = comments.filter(item => item.belong_to);
    const list = comments.filter(item => !item.belong_to).map(item => ({
        ...item,
        replies: replies.filter(reply => item.id === reply?.belong_to?.id)
    })).sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0);

    const [replyTo, setReplyTo] = useState();
    const [belongTo, setBelongTo] = useState();
    const [replyToName, setReplyToName] = useState();
    const setReply = (replyTo, name, belongTo?) => {
        setReplyTo(replyTo);
        setReplyToName(name);
        setBelongTo(belongTo)
    }
    const { addToast } = useToasts();
    const submit = async ({ name, email, url, content, subscribe }) => {
        try {
            const res = await axios.post('/comment-app/comments', {
                name,
                email,
                url,
                content,
                subscribe,
                page,
                replyTo,
                belongTo
            });

            const id = res.data.id;
            await refetch();
            if (replyTo) {
                window.location.href = `#${replyTo}`;
            } else {
                window.location.href = `#${id}`;
            }
        } catch (e) {
            addToast(e?.response?.data?.message ?? e.message, { appearance: 'error', autoDismiss: true });
        }
    }
    return <div>
        <CommentEditor
            onSubmit={(params) => submit(params)}
            resetReplyTo={() => setReply(null, null)}
            replyTo={replyTo}
            replyToName={replyToName}/>
        {list.map(comment => <CommentItem
            isAdmin={meta.admin_email === comment.email}
            key={comment.id}
            onReply={(id, name) => setReply(id, name, comment.id)}
            id={comment.id}
            name={comment.name}
            email={comment.email}
            url={comment.url}
            date={comment.createdAt}
            content={comment.content}>
            {comment.replies.map(reply => <CommentItem
                key={reply.id}
                onReply={(id, name) => setReply(id, name, comment.id)}
                id={reply.id}
                name={reply.name}
                replyTo={reply?.reply_to?.name}
                replyToUrl={reply?.reply_to?.url}
                email={reply.email}
                isAdmin={meta.admin_email === reply.email}
                url={reply.url}
                date={reply.createdAt}
                content={reply.content}
            />)}
        </CommentItem>)}
    </div>
}
