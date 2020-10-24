import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const GenreSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    }
});

export const GenreModel: any = mongoose.model('Genre', GenreSchema);
