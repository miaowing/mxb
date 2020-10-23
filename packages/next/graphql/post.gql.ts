import gql from "graphql-tag";

export const POST_DATA = gql`
  fragment PostData on Post {
    id,
    key,
    title,
    description,
    category,
    author,
    thumb {
      publicUrl
    }
    cover {
      publicUrl
    }
    content,
    html_content,
    publish,
    top,
    source,
    createdAt,
    url,
  }
`;

export const GET_ABOUT = gql`
  query {
    allPosts(where: {key: "about-me"}) {
      ...PostData
    }       
  }
  ${POST_DATA}
`;

