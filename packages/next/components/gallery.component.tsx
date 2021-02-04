import React from 'react';
import { getGalleryInitStyle } from "../helpers/animation.helper";

export const Galleries = ({ children }) => (
    <div className="grid my-8 px-8 lg:grid-cols-4 gap-16 lg:px-16 md:grid-cols-3 sm:grid-cols-2">
        {children}
    </div>
);

export const GalleryItem = ({ index, title, description, image, url }) => (
    <figure id={`gallery-item-${index}`} className="" style={getGalleryInitStyle()}>
        <div className="relative">
            <div className="w-full" style={{ paddingBottom: '66.6667%' }}/>
            <img className="h-auto w-full h-full absolute top-0 object-cover object-center rounded-lg"
                 src={image}
                 alt={title}
            />
        </div>
        <figcaption>
            <a href={url} className="block text-3xl mx-4 mt-8 mb-4">{title}</a>
            <p className="block mx-4 mb-8 text-2xl">{description}</p>
        </figcaption>
    </figure>
);
