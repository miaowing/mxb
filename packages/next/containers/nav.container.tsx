import * as React from 'react';

export const Nav = () => (
    <nav>
        <ul className="flex list-none p-0">
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/posts'}>Blog</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a target="_blank" href={'https://resume.mxb.cc'}>Resume</a>
            </li>
            <li className="hidden sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/music'}>Music</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/contact'}>Contact</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/about'}>About</a>
            </li>
            <li className="hidden sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/guest-book'}>GuestBook</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/links'}>Links</a>
            </li>
        </ul>
    </nav>
);
