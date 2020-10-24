import { RequestHandler, Router } from "express";
import { GenreController } from "../controllers/genre.controller";

export class GenreRoutes {

    private genreController: GenreController = new GenreController();

    public getAllRoutes(middleware: RequestHandler): Router {

        const routes = Router();

        routes.route('/')
            .post(middleware, this.genreController.addGenre)
            .get(this.genreController.listAllGenres)

        return routes;
    }

}