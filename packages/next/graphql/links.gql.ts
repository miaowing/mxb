import gql from "graphql-tag";

export const GET_LINKS = gql`
query {
  allLinks(where: {enable: true}) {
    name,
    url,
    description,
    enable,
    tags {
        key,
        name,
        description
    }
  }
}
`;
