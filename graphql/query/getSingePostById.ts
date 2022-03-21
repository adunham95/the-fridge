export const GET_SINGLE_POST_BY_ID = `
query GetSinglePost($id:String!){
    getSinglePost(id:$id){
        id
        description
        image{
          id
          url
        }
        dateTime
        postedBy{
          name
          id
        }
        likedBy
        viewByGroups
        org{
          id
        }
        comments{
          id
          parentComment
          message
          author{
            name
            accountColor
            id
          }
        }
    }
  }
`;
