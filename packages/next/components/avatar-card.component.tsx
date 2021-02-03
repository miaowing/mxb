import * as React from 'react';
import { CSSProperties } from "react";

interface AvatarCardProps {
    title: string;
    avatar: string;
    postCount?: number;
    commentCount?: number;
    tagCount?: number;
    style?: CSSProperties;
    background?: string;
}

export const AvatarCard = ({ title, avatar, postCount, commentCount, tagCount, style, background }: AvatarCardProps) => {
    return <section
        className="min-h-avatar-card w-104 h-104 border border-solid border-gray-100 bg-white mb-8"
        style={style}>
        <div className="min-h-avatar-card-banner bg-cover bg-center object-cover"
             style={{ backgroundImage: `url(${background})` }}/>
        <img className="h-28 w-28 rounded-full mx-auto -mt-10" src={avatar} alt={title}/>
        <h1 className="text-100xl text-center my-4 font-medium">{title}</h1>
        <ul className="flex border-t border-solid border-gray-100">
            <li className="w-1/3 text-center my-4">文章 {postCount ?? 0}</li>
            <li className="w-1/3 text-center my-4">评论 {commentCount ?? 0}</li>
            <li className="w-1/3 text-center my-4">标签 {tagCount ?? 0}</li>
        </ul>
    </section>
}
