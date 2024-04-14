import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

export const errorHandle = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode).json({
    messsage: err.message,
    stack: err.stack,
  });
};
