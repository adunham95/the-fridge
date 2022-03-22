import { DEFAULT_POST_RETURN } from './createPost';

export const UPDATE_POST_MUTATION = `
mutation UpdatePost($id:String!, $postInput:UpdatePostInput){
    updatePost(id:$id, input:$postInput){
      ${DEFAULT_POST_RETURN}
    }
  }`;
