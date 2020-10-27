import { gql } from 'apollo-server-express';

export const GET_RECEIVERS = gql`
query getReceivers {
  allReceivers(where: {enable: true}) {
    email,
    enable
  }
}
`;
