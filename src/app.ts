import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { jwtStrategy } from './shared/jwtStrategy';


import { HealthCheckRoutes } from './routes/health-check.routes';
import { UserRoutes } from './routes/user.routes';

import { errorCodes } from './shared/constants';

class App {

    public app: express.Application;
    public healthCheckRoutes: HealthCheckRoutes = new HealthCheckRoutes();
    public userRoutes: UserRoutes = new UserRoutes();

    public mongoUrl: string = <string>process.env.MONGO_CON_STRING;

    constructor() {
        this.app = express();

        this.config();
        this.mongoSetup();

        this.app.use('/api/healthcheck', this.getPassportAuthenticatorMiddleware, this.healthCheckRoutes.getAllRoutes());
        this.app.use('/api/users', this.userRoutes.getAllRoutes());
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        passport.use(jwtStrategy);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then((_res: any) => {
            console.log('--------------------------------------------------------------');
            console.log('MongoDB connected successfully!!!');
            console.log('--------------------------------------------------------------');
        }).catch(error => {
            console.log("MongoDB connection failed -", error)
        });
    }

    private getPassportAuthenticatorMiddleware(req: any, res: any, next: any) {
        return passport.authenticate('jwt', { session: false }, function (err, user) {
            if (err || !user) {
                return res.status(401).send({
                    error: {
                        code: errorCodes.AUTH_FAILED,
                        message: "Your session is not valid, you have to login again!",
                        details: err
                    }
                });
            }
            else {
                req.user = user;
                return next();
            }
        })(req, res, next);
    }
}

export default new App().app;
