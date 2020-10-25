import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import IError from '../interfaces/error.interface';
import { UserModel } from '../models/user.model';
import { jwtSecretKey, jwtExpiryTime } from '../shared/constants';

export class AuthController {

    public async login(req: Request, res: Response) {
        try {
            const { userName, password } = req.body;
            if (!userName || !password) {
                res.status(400).json({ error: { message: 'Please input your username and password to login.' } });
            }
            const user: any = await UserModel.findOne({ userName }).exec();
            if (!user) {
                res.status(400).json({ error: { message: `We do not have any user with username ${userName}.` } });
            } else {
                user.comparePassword(password, function (err: any, isMatch: any) {
                    if (isMatch && !err) {
                        const tokenPayload = {
                            name: user.name,
                            userName: user.userName
                        }
                        const token = jwt.sign(tokenPayload, <Secret>jwtSecretKey, {
                            expiresIn: jwtExpiryTime
                        });
                        res.status(200).json({
                            message: 'Auth Passed.',
                            data: tokenPayload,
                            token,
                        })
                    } else {
                        return res.status(401).json({ message: 'Username or Password is incorrect.' })
                    }
                })
            }
        } catch (error) {
            const errorResponse: IError = {
                message: 'We are unable to process your request, please try again later',
                details: error,
            }
            res.status(500).json({ error: errorResponse });
        }
    }
}