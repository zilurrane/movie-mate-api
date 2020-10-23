import { Request, Response } from 'express'
import { MovieModel } from '../models/movie.model';

export class MovieController {

    public async listAllMovies(_req: Request, res: Response) {
        try {
            const response = await MovieModel.find({});
            res.status(200).json(response);
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
