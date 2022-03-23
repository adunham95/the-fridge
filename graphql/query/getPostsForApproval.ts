import { DEFAULT_POST_RETURN } from './../mutation/createPost';

export const GET_POSTS_FOR_APPROVAL = `
query getPostsForApproval($userID:String!){
    getPostsForApproval(userID:$userID){
     ${DEFAULT_POST_RETURN}
      approved
    }
  }
  
`;
