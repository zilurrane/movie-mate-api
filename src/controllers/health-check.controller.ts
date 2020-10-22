import { Request, Response } from 'express';

export class HealthCheckController {
    public ping(_req: Request, res: Response) {
        res.json({
            message: "Pong"
        });
    }
}
