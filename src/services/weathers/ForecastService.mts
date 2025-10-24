import { Service, Value } from '@tsed/di';
import got from 'got';
import { Daily } from '@models/weathers/daily.mjs';

@Service()
export class ForecastService {
  apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

  @Value('WEATHERBIT_API_KEY')
  apiKey!: string;

  async getDays(lat: number, lon: number): Promise<Daily> {
    try {
      const url = `${this.apiUrl}?key=${this.apiKey}&lang=zh-tw&lat=${lat}&lon=${lon}`;
      const res = await got.get<Daily>(url);

      return res.body;
    } catch (error) {
      throw new Error(`Failed to get forecast for lat: ${lat}, lon: ${lon}`);
    }
  }

  async getLocation(city: string): Promise<Daily> {
    try {
      const url = `${this.apiUrl}?key=${this.apiKey}&lang=zh-tw&city=${city}`;
      const res = await got.get<Daily>(url);
      return res.body;
    } catch (error) {
      throw new Error(`Failed to get forecast for city: ${city}`);
    }
  }
}
