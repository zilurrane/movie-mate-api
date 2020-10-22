import express from 'express';
import * as bodyParser from 'body-parser';
import { HealthCheckRoutes } from './routes/health-check.routes';

class App {

    public app: express.Application;
    public healthCheckRoutes: HealthCheckRoutes = new HealthCheckRoutes();

    constructor() {
        this.app = express();

        this.config();

        this.app.use('/api/healthcheck', this.healthCheckRoutes.getAllRoutes());
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;
