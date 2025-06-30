import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    publishedYear: number;
    summary: string;
}

const BookSchema: Schema = new Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 200,
        index: true // Index for title searches
    },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'Author', 
        required: true,
        index: true // Index for author queries
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true,
        index: true // Index for category queries
    },
    publishedYear: { 
        type: Number,
        min: 1000,
        max: new Date().getFullYear() + 10,
        index: true // Index for year-based searches
    },
    summary: { 
        type: String,
        maxlength: 1000,
        trim: true
    }
}, {
    timestamps: true
});

// Compound indexes for common query patterns
BookSchema.index({ author: 1, category: 1 }); // Books by author in specific category
BookSchema.index({ category: 1, publishedYear: -1 }); // Books by category, newest first
BookSchema.index({ title: 'text', summary: 'text' }); // Text search index

// Optimize populate queries
BookSchema.pre(/^find/, function(this: any) {
    // Auto-populate author and category with only necessary fields
    this.populate('author', 'name bio')
        .populate('category', 'name description');
});

export default mongoose.model<IBook>('Book', BookSchema);