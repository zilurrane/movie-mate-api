import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {

    private userController: UserController = new UserController();

    public getAllRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.userController.listAllUsers)

        routes.route('/')
            .post(this.userController.createNewUser)

        return routes;
    }
}