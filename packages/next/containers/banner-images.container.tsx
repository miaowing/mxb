import { useQuery } from "@apollo/client";
import * as React from "react";
import { GET_BANNER_IMAGES } from "../graphql/banner.gql";

export const BannerImagesContainer = props => {
    const styles: React.CSSProperties[] = [
        { height: '332px', left: 0, top: 0, marginBottom: '2%' },
        { height: '251px', right: 0, top: 0, marginBottom: '2%' },
        { height: '200px', left: 0, bottom: 0 },
        { height: '281px', right: 0, bottom: 0 },
    ];
    const { error, data } = useQuery(GET_BANNER_IMAGES);
    if (error) {
        return <div>{error}</div>;
    }

    const images = data?.allBannerImages ?? [];
    return <div
        className="ml-0 m-auto mt-20 max-w-6xl relative w-full md:max-w-4xl lg:ml-32"
        style={{ height: images.length !== 0 ? 543 : 'auto' }}>
        {images.map((image, index) => <div
            key={index}
            className="overflow-hidden w-percent-49 absolute rounded-lg"
            style={styles[index]}>
            <div className="relative p-0 m-0 w-full h-full overflow-hidden">
                <div
                    className="
                        absolute top-0 left-0 right-0 bottom-0 z-0 m-auto transition-all duration-300
                        transform-gpu scale-100 bg-no-repeat bg-cover bg-center hover:scale-110
                    "
                    style={{ backgroundImage: `url(${image?.image?.publicUrl})` }}/>
                {image?.content ?
                    <>
                        <div className="absolute z-30 w-full h-full top-0 flex items-center justify-center text-white">
                            <div dangerouslySetInnerHTML={{ __html: image?.content }}/>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full opacity-80 z-20 bg-layer"/>
                    </> :
                    ''
                }
            </div>
        </div>)}
    </div>
}
