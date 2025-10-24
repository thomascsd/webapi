import { Service, Value } from '@tsed/di';
import { $log } from '@tsed/logger';

@Service()
export class ApiKeyService {
  constructor() {}

  @Value('API_KEY_WHITELIST')
  private apiKeyWhitelist!: string;

  public isWhitelisted(apiKey: string): boolean {
    $log.debug(`API Key Whitelist: ${this.apiKeyWhitelist}`);
    return this.apiKeyWhitelist.indexOf(apiKey) !== -1;
  }
}
