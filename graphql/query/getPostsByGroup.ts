export const GET_POSTS_BY_GROUP = `
query GetPostsByGroup($ids:[String!]){
    getPostsByGroup(groupIDs:$ids){
      id
      description
      viewByGroups
      edited
      updatedAt
      image{
        id
        url
      }
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
      image{
        id
        url
      }
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

export const GET_POSTS_BY_GROUP_DATE = `
query GetPostsByGroup($ids:[String!],$startDate:String,$endDate:String){
    getPostsByGroup(groupIDs:$ids,startDate:$startDate,endDate:$endDate){
      id
      description
      image{
        id
        url
      }
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
