import { Request, Response } from 'express'
import { GenreModel } from '../models/genre.model';

export class GenreController {

    public async listAllGenres(_req: Request, res: Response) {
        try {
            const data = await GenreModel.find().sort({ name: "asc" });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async addGenre(req: Request, res: Response) {
        try {
            const recordToInsert = new GenreModel(req.body);
            const response = await recordToInsert.save();
            if (response && response._id) {
                res.status(200).json(response);
            } else {
                res.status(500).json(response);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
