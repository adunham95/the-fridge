export const GET_COMMENT_BY_POST = `
query GetPostComments($id: String!) {
    getCommentsByPost(id: $id) {
      id
      message
      dateTime
      postID
      author {
        name
        id
      }
    }
  }`;
