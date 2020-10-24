import { Request, Response } from "express";

const corsMiddleware = (_req: Request, res: Response, next: CallableFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
}

export default corsMiddleware;
