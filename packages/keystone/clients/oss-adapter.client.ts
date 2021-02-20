const path = require('path');
const urlJoin = require('url-join');
import * as OSS from 'ali-oss';

export class OSSAdapterClient {
    private readonly client;

    constructor(
        private readonly accessKeyId: string,
        private readonly accessKeySecret: string,
        private readonly region: string,
        private readonly bucket: string,
        private readonly folder: string = '',
    ) {
        this.client = new OSS({ accessKeyId, accessKeySecret, region, bucket });
    }

    async save({ stream, filename, id, mimetype, encoding }) {
        const fileData = {
            id,
            originalFilename: filename,
            filename: this.getFilename({ id, originalFilename: filename }),
            mimetype,
            encoding,
        };

        const result = await this.client.putStream(path.join(this.folder, fileData.filename), stream);
        stream.close ? stream.close() : undefined;
        return { ...fileData, _meta: result };
    }

    /**
     * Deletes the given file from S3
     * @param file File field data
     * @param options A config object to be passed with each call to S3.deleteObject.
     *                Options `Bucket` and `Key` will be set by default.
     *                For available options refer to the [AWS S3 deleteObject API](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property).
     */
    async delete(file, options = {}) {
        if (file) {
            await this.client.delete(path.join(this.folder, file.filename));
        }
    }

    getFilename({ id, originalFilename }) {
        return `${id}-${originalFilename}`;
    }

    publicUrl({ filename }) {
        // This Url will only work if:
        // - the bucket is public OR
        // - the file is set to a canned ACL (ie, uploadParams: { ACL: 'public-read' }) OR
        // - credentials are passed along with the request
        return urlJoin(`https://${this.bucket}.${this.region}.aliyuncs.com`, this.folder, filename);
    }
}
