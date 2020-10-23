import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
    popularity99: {
        type: Number,
        required: 'Popularity is required',
        alias: '99popularity',
    },
    director: {
        type: String,
        required: 'Director is required',
    },
    genre: [{
        type: String,
        required: 'Genre is required',
    }],
    imdb_score: {
        type: Number,
        required: 'IMDB score is required',
    },
    name: {
        type: String,
        required: 'Name is required',
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

export const MovieModel: any = mongoose.model('Movie', MovieSchema);
