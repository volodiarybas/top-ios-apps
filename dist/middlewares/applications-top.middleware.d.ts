import { Response, Request, NextFunction } from 'express';
declare const isCached: (req: Request, res: Response, next: NextFunction) => void;
export default isCached;
