import { useQuery } from "@apollo/client";
import * as React from "react";
import { GET_BANNER_IMAGES } from "../graphql/banner.gql";
import styles from "./banner-images.conainer.module.less";

export const BannerImagesContainer = props => {
    const style = ['one', 'two', 'three', 'four'];
    const { error, data } = useQuery(GET_BANNER_IMAGES);
    if (error) {
        return <div>{error}</div>;
    }

    const images = data?.allBannerImages ?? [];
    return <div className={styles.images} style={{ height: images.length !== 0 ? 543 : 'auto' }}>
        {images.map((image, index) => <div key={index} className={`${styles.container} ${style[index]}`}>
            <div className={`${styles.layer} ${image?.content ? styles.has_content : ''}`}>
                <img src={image?.image?.publicUrl} alt={index}/>
                {image?.content ?
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: image?.content }}/> :
                    ''
                }
            </div>
        </div>)}
    </div>
}
