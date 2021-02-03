import gql from 'graphql-tag';

export const GET_AVATAR_META = gql`
query {
  _allPostsMeta(where: {publish: true}) {
    count
  }
  _allCommentsMeta(where: {passed: true}) {
    count
  }
  _allTagsMeta {
    count
  }
}
`
