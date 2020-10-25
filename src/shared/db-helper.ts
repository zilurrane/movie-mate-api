import { Mongoose } from 'mongoose';
import { GenreModel } from '../models/genre.model';
import { MovieModel } from '../models/movie.model';
import imdbJson from './assets/imdb.json';

export const initializeDatabase = async (mongoose: Mongoose) => {
    try {
        const moviesCount = await mongoose.connection.db.collection('movies').countDocuments();
        if (moviesCount === 0) {
            await MovieModel.insertMany(imdbJson);
            console.log('Added Movies');
            const genreCount = await mongoose.connection.db.collection('genres').countDocuments();
            if (genreCount === 0) {
                let genreSet = new Set();
                imdbJson.forEach(movie => {
                    movie.genre.forEach(genre => genreSet.add(genre.trim()));
                });

                let genreList: any[] = [];
                genreSet.forEach(genre => genreList.push({ name: genre }));

                await GenreModel.insertMany(genreList);
                console.log('Added Genres');
            }
        }
    } catch (error) {
        console.log("Error ocurred during DB initialization - ", error);
    }
}

export const insertGenreList = async (genreList: string[]) => {
    const genreExistPromises = genreList.map(genre => GenreModel.exists({ name: genre }));
    const genreExists = await Promise.all(genreExistPromises);
    const genreListToInsert = genreList.filter((_genre: string, index: number) => genreExists[index] !== true).map(genre => ({ name: genre }));
    if (genreListToInsert && genreListToInsert.length !== 0) {
        await GenreModel.insertMany(genreListToInsert);
    }
}