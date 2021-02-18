import * as React from 'react';

export const Nav = () => (
    <nav>
        <ul className="flex list-none p-0">
            <li className="uppercase text-2xl text-gray-500 ml-8"><a href={'/posts'}>Blog</a></li>
            <li className="uppercase text-2xl text-gray-500 ml-8"><a href={'/music'}>Music</a></li>
            <li className="uppercase text-2xl text-gray-500 ml-8"><a href={'/contact'}>Contact</a></li>
            <li className="uppercase text-2xl text-gray-500 ml-8"><a href={'/about'}>About</a></li>
            <li className="uppercase text-2xl text-gray-500 ml-8"><a href={'/guest-book'}>GuestBook</a></li>
            <li className="uppercase text-2xl text-gray-500 ml-8"><a href={'/links'}>Links</a></li>
        </ul>
    </nav>
);
