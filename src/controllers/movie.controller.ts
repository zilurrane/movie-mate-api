import { Request, Response } from 'express'
import { Types } from 'mongoose';
import IError from '../interfaces/error.interface';
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

            const data = await MovieModel.find(filter).skip(page * limit).limit(limit).sort({ [sortKey]: sortOrder });
            const totalCount = await MovieModel.countDocuments(filter);

            res.status(200).json({ totalCount, page, limit, data });
        } catch (error) {
            const errorResponse: IError = {
                message: 'We are unable to process your request, please try again later.'
            }
            res.status(500).json({ error: errorResponse });
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
            const errorResponse: IError = {
                message: 'We are unable to process your request, please try again later.'
            }
            res.status(500).json({ error: errorResponse });
        }
    }

    public async deleteMovie(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id || !Types.ObjectId.isValid(id)) {
                res.status(400).json({ error: { message: 'Please pass valid id to delete movie.' } });
                return;
            }
            const data = await MovieModel.findByIdAndRemove(id);
            if (!data) {
                const errorResponse: IError = {
                    message: 'Selected movie not found.'
                }
                res.status(404).send({ error: errorResponse });
            } else {
                res.status(204).send();
            }
        } catch (error) {
            const errorResponse: IError = {
                message: 'We are unable to process your request, please try again later.'
            }
            res.status(500).json({ error: errorResponse });
        }
    }
}
