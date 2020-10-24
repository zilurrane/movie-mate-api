import { Request, Response } from 'express'
import { MovieModel } from '../models/movie.model';

export class MovieController {

    public async listAllMovies(req: Request, res: Response) {
        try {
            const sortKey = <string>req.query['sort-key'] || 'popularity99';
            const sortOrder = <string>req.query['sort-order'] || 'desc';
            const query = <string>req.query['query'];
            const genre = <string>req.query['genre'];
            const page = Number(req.query['page']) || 0;
            const limit = Number(req.query['limit']) || 10;

            let filter = {};
            if (query) {
                const filterValue = { "$regex": query, "$options": "i" };
                filter = { $or: [{ name: filterValue }, { director: filterValue }] };
            }
            if (genre) {
                const genreList = genre.split(',');
                filter = { ...filter, genre: { "$all": genreList } };
            }

            const data = await MovieModel.find(filter).skip(page*limit).limit(limit).sort({ [sortKey]: sortOrder });
            const totalCount = await MovieModel.countDocuments(filter);

            res.status(200).json({ totalCount, page, limit, data });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async addMovie(req: Request, res: Response) {
        try {
            const movieRecordToInsert = new MovieModel(req.body);
            const movieRecordResponse = await movieRecordToInsert.save();
            if (movieRecordResponse && movieRecordResponse.id) {
                res.status(200).json(movieRecordResponse);
            } else {
                res.status(500).json(movieRecordResponse);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
