import gql from "graphql-tag";

export const GET_BANNER = gql`
query getBanner($key: String!) {
  allBanners(where: {key: $key}) {
    title,
    content
  }
}
`;
