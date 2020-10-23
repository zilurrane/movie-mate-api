import { Mongoose } from 'mongoose';
import { MovieModel } from '../models/movie.model';
import imdbJson from './assets/imdb.json';

export const initializeDatabase = async (mongoose: Mongoose) => {
    try {
        const moviesCount = await mongoose.connection.db.collection('movies').countDocuments();
        if (moviesCount === 0) {
            await MovieModel.insertMany(imdbJson);
        }
    } catch (error) {
        console.log("Error ocurred during DB initialization - ", error);
    }
}
