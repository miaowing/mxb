import gql from "graphql-tag";

export const GET_GALLERIES = gql`
query {
  allGalleries(where: { publish: true }, orderBy: "sort_ASC", first: 3) {
    title,
    description,
    url,
    thumb {
      publicUrl
    }
  }
}
`;
