import { Mongoose } from 'mongoose';
import { GenreModel } from '../models/genre.model';
import { MovieModel } from '../models/movie.model';
import imdbJson from './assets/imdb.json';

export const initializeDatabase = async (mongoose: Mongoose) => {
    try {
        const moviesCount = await mongoose.connection.db.collection('movies').countDocuments();
        if (moviesCount === 0) {
            await MovieModel.insertMany(imdbJson);

            let genreSet = new Set();
            imdbJson.forEach(movie => {
                movie.genre.forEach(genre => genreSet.add(genre.trim()));
            });

            let genreList: any[] = [];
            genreSet.forEach(genre => genreList.push({ name: genre }));

            await GenreModel.insertMany(genreList);
        }
    } catch (error) {
        console.log("Error ocurred during DB initialization - ", error);
    }
}
