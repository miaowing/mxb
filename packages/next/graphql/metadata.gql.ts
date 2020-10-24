import gql from "graphql-tag";

export const GET_SITE_METADATA = gql`
query {
  allSiteMetas {
    title,
    icp,
    icp_url
  }
}
`;
