import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {

    private authController: AuthController = new AuthController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/login')
            .post(this.authController.login);

        return routes;
    }
}