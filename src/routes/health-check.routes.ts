import { Router } from "express";
import { HealthCheckController } from "../controllers/health-check.controller";

export class HealthCheckRoutes {

    private healthCheckController: HealthCheckController = new HealthCheckController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/ping')
            .get(this.healthCheckController.ping);

        return routes;
    }
}