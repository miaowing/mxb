import { Keystone } from "@keystonejs/keystone";
import { GET_METADATA } from "../graphql/site-meta.gql";
import { Metadata } from "../interfaces/metadata.interface";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectKeystone } from "../decorators/inject-keystone.decorator";

@Injectable()
export class MetadataService {
    constructor(
        @InjectKeystone() private readonly keystone: Keystone,
    ) {
    }

    async getMetadata(key?: string): Promise<Metadata> {
        const res = await this.keystone.executeGraphQL({ query: GET_METADATA });
        const meta = res.data.allSiteMetas[0];
        if (!meta) {
            throw new BadRequestException('Please config the site metadata at first');
        }

        if (key) {
            return meta[key];
        }

        return meta;
    }
}
