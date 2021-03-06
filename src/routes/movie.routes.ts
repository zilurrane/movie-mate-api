import { RequestHandler, Router } from "express";
import { MovieController } from "../controllers/movie.controller";

export class MovieRoutes {

    private movieController: MovieController = new MovieController();

    public getAllRoutes(middleware: RequestHandler): Router {

        const routes = Router();

        routes.route('/')
            .post(middleware, this.movieController.addMovie)
            .get(this.movieController.listAllMovies)

        routes.route('/:id')
            .delete(middleware, this.movieController.deleteMovie)
            .patch(middleware, this.movieController.updateMovie)

        return routes;
    }

}