import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

export class MovieRoutes {

    private movieController: MovieController = new MovieController();

    public getAllRoutes(middleware: any): Router {

        const routes = Router();

        routes.route('/')
            .post(middleware, this.movieController.addMovie)
            .get(this.movieController.listAllMovies)

        return routes;
    }

}