import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema(
  {
    dateTime: { type: 'String' },
    message: { type: 'String', required: true },
    postID: { type: 'String', index: true },
    parentComment: { type: 'String' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
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
