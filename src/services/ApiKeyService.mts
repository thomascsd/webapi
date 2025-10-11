import { Service } from '@tsed/di';

@Service()
export class ApiKeyService {
  private readonly whitelist: string[] = [
    // Add your whitelisted API keys or routes here
    'api-key-1',
    'api-key-2',
  ];

  public isWhitelisted(apiKey: string): boolean {
    return this.whitelist.includes(apiKey);
  }
}
