import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema(
  {
    dateTime: { type: 'String' },
    description: { type: 'String' },
    image: { type: 'String' },
    org: { type: Schema.Types.ObjectId, ref: 'Org' },
    authorID: { type: 'String' },
    viewByGroups: { type: 'Array' },
    comments: { type: 'Array' },
    permissions: { type: 'Array' },
    likedBy: { type: 'Array' },
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
