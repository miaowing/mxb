import gql from "graphql-tag";

export const GET_INNER_LINKS = gql`
query {
  allLinks(where: {enable: true, type: inner}) {
    name,
    url,
    description,
    enable,
    type,
    tags {
        key,
        name,
        description,
        sort,
    },
    avatar {
        publicUrl
    }
  }
}
`;

export const GET_GLOBAL_LINKS = gql`
query {
  allLinks(where: {enable: true, type: global}) {
    name,
    url,
    description,
    enable,
    type,
    tags {
        key,
        name,
        description,
        sort,
    }
  }
}
`;
