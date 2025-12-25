import { Service, Constant, Inject } from '@tsed/di';
import { Logger } from '@tsed/logger';

@Service()
export class ApiKeyService {
  @Inject()
  logger!: Logger;

  constructor() {}

  @Constant('API_KEY_WHITELIST')
  private apiKeyWhitelist!: string;

  public isWhitelisted(apiKey: string): boolean {
    this.logger.debug(`API Key Whitelist: ${this.apiKeyWhitelist}`);
    return this.apiKeyWhitelist.indexOf(apiKey) !== -1;
  }
}
