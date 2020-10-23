import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

export class MovieRoutes {

    private movieController: MovieController = new MovieController();

    public getProtectedRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .post(this.movieController.addMovie)

        return routes;
    }

    public getPublicRoutes(): Router {

        const routes = Router();

        routes.route('/')
            .get(this.movieController.listAllMovies)

        return routes;
    }
}