import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: 'String', required: true },
    accountColor: { type: 'String', default: '#0000FF' },
    password: { type: 'String', required: true },
    email: { type: 'String', required: true, index: true },
    validEmail: { type: 'Boolean' },
    username: { type: 'String' },
    created: {
      type: Date,
      default: Date.now,
    },
    orgs: [
      {
        org: { type: Schema.Types.ObjectId, ref: 'Org' },
        group: { type: Schema.Types.ObjectId, ref: 'Group' },
      },
    ],
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
