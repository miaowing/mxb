import * as React from 'react';
import { prettyDate } from "../helpers/date.helper";

export const RandomPost = ({ posts }) => {
    return <section className="bg-white border border-solid border-gray-100">
        <h1 className="text-100xl p-6">随便看看</h1>
        <div className="px-4">
            {posts.map(post => (
                <a href={`/posts/${post?.key}`} key={post?.key}>
                    <figure
                        className="bg-cover bg-center h-44 mb-6 text-white relative"
                        style={{ backgroundImage: `url(${post?.thumb?.publicUrl})` }}>
                        <div className="absolute left-0 right-0 bottom-0 px-6 pb-4"
                             style={{ backgroundColor: 'rgba(26,21,58, 0.3)' }}>
                        <span className="text-base block my-2">
                            {prettyDate(post?.createdAt, 'YYYY-MM-DD')}
                        </span>
                            <h1 className="text-2xl whitespace-nowrap overflow-ellipsis overflow-hidden block">
                                {post?.title}
                            </h1>
                        </div>
                    </figure>
                </a>
            ))}
        </div>
    </section>
}
