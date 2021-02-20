import { Keystone } from "@keystonejs/keystone";
import { initUserModel } from "./user.model";
import { initSiteMetadataModel } from "./site-metadata.model";
import { initGalleryModel } from "./gallery.model";
import { initBannerModel } from "./banner.model";
import { initPostModel } from "./post.model";
import { initMessageModel } from "./message.model";
import { initTagModel } from "./tag.model";
import { initLinkModel } from "./links.model";
import { initCommentModel } from "./comment.model";
import { initSubscriptionModel } from "./subscription.model";
import { initBannerImageModel } from "./banner-image.model";
import { ConfigService } from "@nestjs/config";
import { OSSAdapterClient } from "../clients/oss-adapter.client";
import { ALI_ACCESS_KEY, ALI_BUCKET, ALI_REGION, ALI_SECRET_KEY, UPLOAD_FOLDERS } from "../constants/env.constants";

export function initModels(keystone: Keystone, config: ConfigService) {
    const ossAdapter = new OSSAdapterClient(
        config.get(ALI_ACCESS_KEY),
        config.get(ALI_SECRET_KEY),
        config.get(ALI_REGION),
        config.get(ALI_BUCKET),
        config.get(UPLOAD_FOLDERS),
    );
    initUserModel(keystone);
    initSiteMetadataModel(keystone, ossAdapter);
    initGalleryModel(keystone, ossAdapter);
    initBannerModel(keystone);
    initPostModel(keystone, ossAdapter);
    initMessageModel(keystone);
    initTagModel(keystone);
    initLinkModel(keystone, ossAdapter);
    initCommentModel(keystone);
    initSubscriptionModel(keystone);
    initBannerImageModel(keystone, ossAdapter);
}
