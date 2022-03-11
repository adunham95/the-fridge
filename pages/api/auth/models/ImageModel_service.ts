import { Schema, model, models } from 'mongoose';

export const ImageSchema = new Schema(
  {
    created: { type: 'Date' },
    service: { type: 'String' },
    fileName: { type: 'String', index: true },
    url: { type: 'String', index: true },
    alt: { type: 'String' },
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

export const ImageModel = models.Image || model('Image', ImageSchema);
