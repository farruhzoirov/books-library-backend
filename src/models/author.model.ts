import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    bio?: string;
}

const AuthorSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 100,
        index: true // Index for author name searches
    },
    bio: { 
        type: String, 
        maxlength: 500,
        trim: true 
    }
}, {
    timestamps: true
});

// Text search index for name and bio
AuthorSchema.index({ name: 'text', bio: 'text' });

export default mongoose.model<IAuthor>('Author', AuthorSchema);