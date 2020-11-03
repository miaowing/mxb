import { gql } from 'apollo-server-express';

export const GET_METADATA = gql`
query {
  allSiteMetas {
    title,
    icp,
    icp_url,
    avatar {
      publicUrl
    },
    qrcode {
      publicUrl
    },
    admin_name,
    admin_email
  }
}
`;
