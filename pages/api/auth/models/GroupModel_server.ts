import { Schema, model, models } from 'mongoose';

export const GroupSchema = new Schema(
  {
    name: { type: 'String', required: true },
    permissions: [{ type: 'String' }],
    orgID: { type: Schema.Types.ObjectId, ref: 'Org', required: true },
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

export const GroupModel = models.Group || model('Group', GroupSchema);
