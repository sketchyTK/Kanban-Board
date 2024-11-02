import { Request, Response, NextFunction } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authorHeader = req.headers.authorization;

  if (authorHeader) {
    const token = authorHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
    req.user = user as JwtPayload;
    return next();
  });
} else {
  res.sendStatus(401);
}
};
