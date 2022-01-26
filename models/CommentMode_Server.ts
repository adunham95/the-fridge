import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema(
  {
    dateTime: { type: 'String' },
    message: { type: 'String' },
    postID: { type: 'String' },
    parentComment: { type: 'String' },
    authorID: { type: 'String' },
  },
  {
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  },
);

export const CommentModel = models.Comment || model('Comment', CommentSchema);
