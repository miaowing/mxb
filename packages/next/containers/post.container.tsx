import * as React from 'react';
import ReactMarkdown from "react-markdown";
import { prettyDate } from "../helpers/date.helper";
import { AvatarCard } from "../components/avatar-card.component";
import { useQuery } from "@apollo/client";
import { GET_AVATAR_META } from "../graphql/meta.gql";
import { StickyContainer, Sticky } from 'react-sticky';
import { RandomPost } from "../components/random-post.component";
import { GET_ALL_POSTS } from "../graphql/post.gql";
import { Post as IPost } from '../interfaces/post.interface';
import { getRandomArrayElements } from "../helpers/data.helper";

export const Post = ({ post, children, avatar, title }) => {
    let content = <div className="post" dangerouslySetInnerHTML={{ __html: post.html_content }}/>;
    if (post.content) {
        content = <div className="post"><ReactMarkdown source={post.content}/></div>;
    }
    const { data } = useQuery(GET_AVATAR_META);
    const { posts } = useQuery<{ posts: IPost[] }>(GET_ALL_POSTS).data ?? { posts: [] };
    const postCount = data?._allPostsMeta?.count;
    const commentCount = data?._allCommentsMeta?.count;
    const tagCount = data?._allTagsMeta?.count;

    const randomPosts = getRandomArrayElements(posts, 3);

    return (
        <>
            <article className="px-8 md:px-16 text-gray-500 leading-loose">
                <div
                    style={{ backgroundImage: `${post.cover ? `url(${post?.cover?.publicUrl})` : 'none'}` }}
                    className="
                        text-center min-h-banner bg-no-repeat bg-cover bg-footer bg-center rounded-3xl
                        mb-14 text-white grid content-center relative p-8 overflow-hidden
                    ">
                    <h1 className="text-center mx-auto mb-2 text-5xl max-w-title">{post.title}</h1>
                    <div className="mx-auto text-center max-w-title text-100xl">{prettyDate(post.createdAt)}</div>
                </div>
                <StickyContainer className="justify-center flex gap-10">
                    <div className="max-w-post w-0 flex-1">
                        <div className="border border-solid border-gray-100 p-12 bg-white rounded">
                            {content}
                        </div>
                        <div className="w-full mt-8">
                            <div className="flex gap-2 text-2xl">
                                {post.tags?.map(tag => (
                                    <span key={tag.key}
                                          className="block px-4 bg-primary text-white rounded px-4 py-2">
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12">
                            {children}
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="w-104"/>
                        <Sticky disableCompensation={true}>
                            {({ style }) => (
                                <div style={style}>
                                    <AvatarCard
                                        avatar={avatar}
                                        title={title}
                                        postCount={postCount}
                                        commentCount={commentCount}
                                        tagCount={tagCount}
                                    />
                                    <RandomPost posts={randomPosts}/>
                                </div>
                            )}
                        </Sticky>
                    </div>
                </StickyContainer>
            </article>
        </>
    )
}
