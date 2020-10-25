import * as mongoose from 'mongoose';

export default interface IUser extends mongoose.Document {
    userName: string;
    name: string;
    password: string;
    createdAt: Date;
};
