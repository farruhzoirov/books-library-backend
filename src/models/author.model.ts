import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    biography: string;
}

const AuthorSchema: Schema = new Schema({
    name: { type: String, required: true },
    biography: { type: String }
});

export default mongoose.model<IAuthor>('Author', AuthorSchema);