export const UPDATE_LIKE = `
mutation UpdateLike($likeInput:UpdateLikeInput!){
    updateLike(input:$likeInput){
      success
    }
  }
`;
