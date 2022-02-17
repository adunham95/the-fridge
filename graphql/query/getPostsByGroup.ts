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
        accountColor
      }
      likedBy
      comments
    }
  }`;

export const GET_POSTS_BY_GROUP_LIMIT_SKIP = `
query GetPostsByGroup($ids:[String!],$limit:Float,$skip:Float){
    getPostsByGroup(groupIDs:$ids,limit:$limit,skip:$skip){
      id
      description
      image
      dateTime
      permissions
      org{
        id
        name
      }
      postedBy{
        name
        id
        accountColor
      }
      likedBy
      comments
    }
  }`;
