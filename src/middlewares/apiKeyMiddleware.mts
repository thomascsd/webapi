import { Context } from '@tsed/platform-params';
import { Middleware, MiddlewareMethods } from '@tsed/platform-middlewares';
import { Forbidden, Unauthorized } from '@tsed/exceptions';
import { ApiKeyService } from '@services/ApiKeyService.mjs';

@Middleware()
export class ApiKeyMiddleware implements MiddlewareMethods {
  constructor(private apiKeyService: ApiKeyService) {}

  use(@Context() $ctx: Context) {
    const apiKey = $ctx.request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new Unauthorized('API key is missing');
    }

    if (!this.apiKeyService.isWhitelisted(apiKey)) {
      throw new Forbidden('Invalid API key');
    }

    $ctx.next();
  }
}
