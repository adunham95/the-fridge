export const CREATE_POST_MUTATION = `mutation CreatePost($newPost:PostInput) {
    createPost(input:$newPost) {
      description
      image
      orgID
    }
  }`;
