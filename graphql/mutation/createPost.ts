export const CREATE_POST_MUTATION = `mutation CreatePost($newPost:PostInput) {
    createPost(input:$newPost) {
      id
      description
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
      }
      likedBy
    }
  }`;
