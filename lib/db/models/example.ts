import mongoose, { Schema, model, models } from 'mongoose';

export interface IExample {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const exampleSchema = new Schema<IExample>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
    },
    {
        timestamps: true,
    }
);

// Check if the model exists before creating a new one
export const Example = models.Example || model<IExample>('Example', exampleSchema); 