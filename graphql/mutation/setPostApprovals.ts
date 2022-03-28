export const SET_POST_APPROVALS = `mutation SetPostApprovals($posts:[PostsToApproval!]){
	setPostApprovals(posts:$posts){
    success
  }
}`;
