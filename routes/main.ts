import { Router, Response } from 'express';

const mainRoutes = Router();

mainRoutes.get('/', (req: any, res: Response) => {
    res.json({
        result: true
    });
});


export default mainRoutes;