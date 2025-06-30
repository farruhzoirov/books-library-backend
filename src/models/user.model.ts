import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role?: string;
}

const UserSchema: Schema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: { type: String, enum: ['user', 'admin'], default: 'user', index: true }
    },
    {
        timestamps: true
    }
);

UserSchema.index({ email: 1, role: 1 });

UserSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    }
});

export default mongoose.model<IUser>('User', UserSchema);