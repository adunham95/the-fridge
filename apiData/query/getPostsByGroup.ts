export const GET_POSTS_BY_GROUP = `
query GetPostsByGroup($ids:[String!]){
    getPostsByGroup(groupIDs:$ids){
      id
      description
      image
      dateTime
      org{
        id
        name
      }
      postedBy{
        name
        id
      }
      likedBy
    }
  }`;
