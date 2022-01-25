export interface IComment {
  id: string;
  message: string;
  dateTime: string;
  postID: string;
  parentComment?: string;
  commentAuthor: ICommentAuthor;
}

export interface ICommentAuthor {
  id: string;
  name: string;
}
