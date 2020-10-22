import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { HealthCheckRoutes } from './routes/health-check.routes';

class App {

    public app: express.Application;
    public healthCheckRoutes: HealthCheckRoutes = new HealthCheckRoutes();
    public mongoUrl: string = <string>process.env.MONGO_CON_STRING;

    constructor() {
        this.app = express();

        this.config();
        this.mongoSetup();

        this.app.use('/api/healthcheck', this.healthCheckRoutes.getAllRoutes());
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then((_res: any) => {
            console.log('--------------------------------------------------------------');
            console.log('MongoDB connected successfully!!!');
            console.log('--------------------------------------------------------------');
        });
    }
}

export default new App().app;
