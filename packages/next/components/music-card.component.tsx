import * as React from 'react';
import { Icons } from "../constants/icons.constants";

export const MusicCards = ({ children }) => {
    return <div className="music-component">
        <div className="children">
            <div className="wrap">
                {children}
            </div>
        </div>
    </div>
}

export const MusicCard = ({ image, name, singer, onClick }) => {
    return <div className="card">
        <div className="cover" onClick={onClick}>
            <div className="cover hover" style={{ backgroundImage: `url(${image})` }}>
                <button className="button">{Icons().play}</button>
            </div>
            <img src={image} alt={name}/>
        </div>
        <div className="text">
            <div className="name">
                <a onClick={onClick}>{name}</a>
            </div>
            <div className="desc">
                {singer}
            </div>
        </div>
    </div>
}
