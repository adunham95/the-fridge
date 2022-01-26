export const ALL_POSTS_QUERY = `
query allPosts{
  getPosts{
    id
    description
    image
    dateTime
    orgID
    orgName
    viewByGroups
    postedBy{
      name
      id
    }
    likedBy
    comments{
      id
      parentComment
      message
      commentAuthor{
        id
        name
      }
    }
  }
}
`;

export const allPostsQueryOptions = (skip = 0) => ({
  variables: { skip, first: 10 },
  updateData: (prevResult: any, result: any) => ({
    ...result,
    allPosts: prevResult
      ? [...prevResult.allPosts, ...result.allPosts]
      : result.allPosts,
  }),
});
