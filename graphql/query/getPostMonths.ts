export const GET_POSTS_BY_MONTH_QUERY = `
getPostTimeline(groupIDs:$ids){
    month
    year
  }`;
export const GET_POSTS_BY_MONTH = `
query GetPostsDateTime($ids:[String!],){
    getPostTimeline(groupIDs:$ids){
      month
      year
    }
  }`;
