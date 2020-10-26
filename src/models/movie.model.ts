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
        trim: true,
        required: 'Genre is required',
    }],
    imdbScore: {
        type: Number,
        alias: 'imdb_score',
        required: 'IMDB score is required',
    },
    name: {
        type: String,
        required: 'Name is required',
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

export const MovieModel: any = mongoose.model('Movie', MovieSchema);
