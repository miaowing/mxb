import gql from "graphql-tag";

export const GET_PAGE_LINKS = gql`
query {
  allLinks(where: {enable: true, position: page}) {
    name,
    url,
    description,
    enable,
    position,
    tags {
        key,
        name,
        description,
        sort,
    }
  }
}
`;

export const GET_FOOTER_LINKS = gql`
query {
  allLinks(where: {enable: true, position: footer}) {
    name,
    url,
    description,
    enable,
    position,
    tags {
        key,
        name,
        description,
        sort,
    }
  }
}
`;
