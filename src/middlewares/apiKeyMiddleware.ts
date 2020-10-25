import * as express from 'express';

export function apiKeyMiddleware(
  request: express.Request,
  response: express.Response,
  next?: (err?: any) => any
): any {}
