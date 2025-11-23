import mongoose, { Document } from 'mongoose';

export interface INewsletter extends Document {
    email: string;
}

const newsletterSchema = new mongoose.Schema<INewsletter>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (v: string) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
            message: 'Please enter a valid email',
        },
    },
});

const Newsletter = mongoose.model<INewsletter>('Newsletter', newsletterSchema);

export default Newsletter;
