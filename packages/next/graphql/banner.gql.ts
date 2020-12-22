import gql from "graphql-tag";

export const GET_BANNER = gql`
query getBanner($key: String!) {
  allBanners(where: {key: $key}) {
    title,
    content
  }
}
`;

export const GET_BANNER_IMAGES = gql`
query getBannerImages {
  allBannerImages(sortBy: [sort_ASC]) {
    image {
      publicUrl
    },
    content,
    sort
  }
}
`
