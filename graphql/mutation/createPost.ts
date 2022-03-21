export const DEFAULT_POST_RETURN = `
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
`;

export const CREATE_POST_MUTATION = `mutation CreatePost($newPost:PostInput) {
    createPost(input:$newPost) {
     ${DEFAULT_POST_RETURN}
    }
  }`;
