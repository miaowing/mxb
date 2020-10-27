import { gql } from 'apollo-server-express';

export const GET_COMMENT = gql`
query getComment($id: ID!, $page: String!) {
  Comment(where: {id: $id, page: $page}) {
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
      subscribe
    },
    belong_to {
      id,
      name,
      email,
      url,
      content,
      subscribe
    },
    subscribe
  }
}
`;
