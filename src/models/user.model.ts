import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    userName: {
        type: String,
        required: 'Username is required',
        unique: true
    },
    name: {
        type: String,
        required: 'Name is required',
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    let user: any = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    }
    else {
        return next()
    }
})

export const UserModel: any = mongoose.model('User', UserSchema);