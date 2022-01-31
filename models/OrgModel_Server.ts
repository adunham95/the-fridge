import { Schema, model, models } from 'mongoose';

export const OrgSchema = new Schema(
  {
    name: { type: 'String', required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    defaultPostSettings: [{ type: 'String' }],
    defaultPostGroups: [{ type: 'String' }],
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

export const OrgModel = models.Org || model('Org', OrgSchema);
