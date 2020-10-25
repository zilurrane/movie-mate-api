import { Request, Response } from 'express'
import { UserModel } from '../models/user.model';

export class UserController {

    public listAllUsers(_req: Request, res: Response) {
        UserModel.find({}, (err: any, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(response);
        });
    }

    public async createNewUser(req: Request, res: Response) {
        try {
            const userRecordToInsert = new UserModel(req.body);
            let userRecordResponse = await userRecordToInsert.save();
            if (userRecordResponse && userRecordResponse._id) {
                res.status(200).json(userRecordResponse);
            } else {
                res.status(500).json(userRecordResponse);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}