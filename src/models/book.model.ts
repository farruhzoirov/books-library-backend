import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    publishedYear: number;
    summary: string;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    publishedYear: { type: Number },
    summary: { type: String }
});


export default mongoose.model<IBook>('Book', BookSchema);