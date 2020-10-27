import gql from 'graphql-tag';

export const COMMENT_DATA = gql`
  fragment CommentData on Comment {
    id,
    page,
    name,
    email,
    url,
    content,
    reply_to {
      id,
      name,
      email,
      url,
      content,
      subscribe,
      createdAt
    },
    belong_to {
      id,
      name,
      email,
      url,
      content,
      subscribe,
      createdAt
    },
    subscribe,
    createdAt
  }
`;

export const GET_COMMENTS = gql`
query getComments($page: String!) {
  allComments(where: {page: $page} sortBy: [createdAt_ASC]) {
    ...CommentData
  }
}
${COMMENT_DATA}
`;
