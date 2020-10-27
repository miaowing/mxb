import { Keystone } from "@keystonejs/keystone";
import { GET_METADATA } from "../graphql/site-meta.gql";
import { Metadata } from "../../interfaces/metadata.interface";
import { BadRequestException } from "../exceptions";

export class MetadataService {
    async getMetadata(keystone: Keystone, key?: string): Promise<Metadata> {
        const res = await keystone.executeGraphQL({ query: GET_METADATA });
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

export const metadataService = new MetadataService();
