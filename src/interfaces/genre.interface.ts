import * as mongoose from 'mongoose';

export default interface IGenre extends mongoose.Document {
    name: string;
};
