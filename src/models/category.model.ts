import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description?: string;
}

const CategorySchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true, 
        maxlength: 100,
        index: true // Index for category name searches
    },
    description: { 
        type: String, 
        maxlength: 500,
        trim: true 
    }
}, {
    timestamps: true
});

// Text search index for name and description
CategorySchema.index({ name: 'text', description: 'text' });

export default mongoose.model<ICategory>('Category', CategorySchema);