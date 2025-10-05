import express from 'express';

export function apiKeyMiddleware(
  request: express.Request,
  response: express.Response,
  next?: (err?: unknown) => void
): any {
  const apiKey: string = request.header('x-apiKey') || '';
  const allowedApiKey: string = process.env.ALLOWED_API_KEY || '';

  if (apiKey && allowedApiKey && next && allowedApiKey.includes(apiKey)) {
    next(null);
  } else {
    response.status(401);
  }
}
