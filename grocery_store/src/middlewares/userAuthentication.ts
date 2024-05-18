import { Request, Response, NextFunction } from 'express';

function userAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    // Add logic based on whatever is used for authentication. e.g., session, JWT;

    
    next();
}

export default userAuthenticationMiddleware;
