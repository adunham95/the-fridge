import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: 'String' },
    orgs: [{ type: Schema.Types.ObjectId, ref: 'Org' }],
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

export const UserModel = models.User || model('User', UserSchema);
