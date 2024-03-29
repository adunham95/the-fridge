import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema(
  {
    dateTime: { type: 'Date', index: true },
    updatedAt: { type: 'Date' },
    edited: { type: 'Boolean' },
    description: { type: 'String' },
    image: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    org: { type: Schema.Types.ObjectId, ref: 'Org' },
    authorID: { type: 'String' },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    viewByGroups: [{ type: 'String' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    permissions: [{ type: 'String' }],
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    approved: { type: 'String', index: true },
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

export const PostModel = models.Post || model('Post', PostSchema);
