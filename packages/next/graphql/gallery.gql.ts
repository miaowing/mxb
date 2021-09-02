import gql from "graphql-tag";

export const GET_GALLERIES = gql`
query {
  allGalleries(where: { publish: true }, orderBy: "sort_ASC", first: 4) {
    title,
    description,
    url,
    cover {
      publicUrl
    }
    thumb {
      publicUrl
    }
  }
}
`;
