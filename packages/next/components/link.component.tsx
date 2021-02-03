import * as React from 'react';

export const Links = ({ children }) => (
    <div className="mx-8 md:mx-16">
        <div className="grid grid-cols-1 gap-12 mt-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {children}
        </div>
    </div>
);

interface PostCardProps {
    url?: string;
    title?: string;
    thumb?: string;
    description?: string;
    category?: string;
}

export const LinkItem = ({ url, thumb, title, description, category }: PostCardProps) => {
    const isExternalUrl = url?.indexOf('http') === 0;
    return <>
        <div className="w-full mx-auto bg-white rounded shadow-md overflow-hidden">
            <div className="lg:flex">
                <div className="lg:flex-shrink-0">
                    <img className="h-48 w-full object-cover lg:w-48 object-cover" src={thumb} alt={title}/>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{category}</div>
                    <a href={url} target={isExternalUrl ? '_blank' : '_self'}
                       className="block mt-1 text-100xl leading-tight font-medium text-black">
                        {title}
                    </a>
                    <p className="mt-2 text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    </>;
}
