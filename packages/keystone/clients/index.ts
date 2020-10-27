import { EmailClient } from "./email.client";
import { OSSAdapterClient } from "./oss-adapter.client";
import { oss } from '../config';

export const email = new EmailClient();
export const ossAdapter = new OSSAdapterClient(
    oss.accessKey,
    oss.secretKey,
    oss.region,
    oss.bucket,
    oss.folder,
);
