export const CREATE_COMMENT_MUTATION = `
mutation CreateComment($newComment: CommentInput!){
    createComment(input:$newComment){
      id
      postID
      message
      dateTime
      author{
        id
        name
      }
    }
  }`;
