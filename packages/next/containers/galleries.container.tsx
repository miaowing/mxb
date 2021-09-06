import * as React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import { Gallery } from "../interfaces/gallery.interface";
import { getGalleryInitStyle } from "../helpers/animation.helper";

export const GalleriesContainer = ({ galleries }: { galleries: Gallery[] }) => {
    const main = galleries[0];
    const second = galleries[1];
    const third = galleries[2];
    return <section>
        <Grid fluid className="px-8 sm:px-16 pb-40">
            <Row>
                <Col md={12} lg={8} className="flex mt-6">
                    <a className="p-16 bg-black block rounded-3xl bg-cover bg-no-repeat bg-center w-full relative"
                       id="gallery-item-0"
                       target="__blank"
                       style={{ backgroundImage: `url(${main?.thumb?.publicUrl})`, ...getGalleryInitStyle() }}
                       href={main?.url}>
                        <Row className="h-full">
                            <Col md={8} lg={9} sm={12} className="flex flex-col">
                                <img src={main?.cover?.publicUrl} className="h-20 w-20"/>
                                <h3 className="text-white text-7xl sm:text-8xl font-black mt-10 leading-19 sm:leading-26">
                                    {main?.title}
                                </h3>
                                <p className="
                                    text-white text-4xl sm:text-5xl font-light mt-10
                                    flex-grow flex-1 leading-13 sm:leading-16
                                ">
                                    {main?.description}
                                </p>
                                <button
                                    style={{ outline: 'none' }}
                                    className="
                                        px-6 py-2 border border-white bg-gray-50 text-gray-500 mt-5 rounded-md w-56
                                        hover:bg-gray-200 hover:border-gray-200
                                    ">
                                    Learn more
                                </button>
                            </Col>
                        </Row>
                    </a>
                </Col>
                <Col md={12} lg={4}>
                    <Row className="h-full">
                        <Col sm={12} md={6} lg={12} className="mt-6">
                            <a id="gallery-item-1" className="
                                px-12 py-10 bg-black bg-cover block rounded-3xl flex flex-col h-full
                                bg-cover bg-no-repeat bg-center w-full relative
                            "
                               target="__blank"
                               style={{ backgroundImage: `url(${second?.thumb?.publicUrl})`, ...getGalleryInitStyle() }}
                               href={second?.url}>
                                <img src={second?.cover?.publicUrl} className="h-20 w-20"/>
                                <div className="text-white font-bold mt-5 text-4xl leading-11">
                                    {second?.title}
                                </div>
                                <div className="text-white font-light mt-5 text-2xl leading-10 flex-1 flex-grow">
                                    {second?.description}
                                </div>
                                <button
                                    style={{ outline: 'none' }}
                                    className="
                                        px-6 py-2 border border-gallery-button text-white mt-5 rounded-md w-44
                                        hover:border-gallery-button-hover hover:bg-gallery-button-hover-bg
                                    ">
                                    Learn more
                                </button>
                            </a>
                        </Col>
                        <Col sm={12} md={6} lg={12} className="mt-6">
                            <a id="gallery-item-2" className="
                                   px-12 py-10 bg-black block rounded-3xl flex flex-col h-full
                                   bg-cover bg-no-repeat bg-center relative
                               "
                               target="__blank"
                               style={{ backgroundImage: `url(${third?.thumb?.publicUrl})`, ...getGalleryInitStyle() }}
                               href={third?.url}>
                                <img src={third?.cover?.publicUrl} className="h-20 w-20"/>
                                <div className="text-white font-bold mt-5 text-4xl leading-11">
                                    {third?.title}
                                </div>
                                <div className="text-white font-light mt-5 text-2xl leading-10 flex-1 flex-grow">
                                    {third?.description}
                                </div>
                                <button
                                    style={{ outline: 'none' }}
                                    className="
                                        px-6 py-2 border border-gallery-button text-white mt-5 rounded-md w-44
                                        hover:border-gallery-button-hover hover:bg-gallery-button-hover-bg
                                    ">
                                    Learn more
                                </button>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    </section>;
}
