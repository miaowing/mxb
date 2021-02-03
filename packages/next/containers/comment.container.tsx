import * as React from 'react';
import dynamic from "next/dynamic";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../graphql/comment.gql";
import { useToasts } from 'react-toast-notifications';
import { Metadata } from "../interfaces/meta.interface";

const MxbComment: any = dynamic(
    () => import("mxb-comment").then(mod => mod.MxbComment) as any,
    { ssr: false },
);

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

    const { addToast } = useToasts();
    const submit = async ({ name, email, url, content, subscribe, belongTo, replyTo }) => {
        try {
            const res = await axios.post('/nest-api/comments', {
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
        <MxbComment onSubmit={(params) => submit(params)} comments={list} adminEmail={meta.admin_email}/>
    </div>
}
