import got from 'got';
import { Daily } from '../../models/weathers/daily';

export class ForecastService {
  apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

  async getDays(lat: number, lon: number) {
    const got = await import('got');
    const url = `${this.apiUrl}?key=${process.env.WEATHERBIT_API_KEY}&lang=zh-tw&lat=${lat}&lon=${lon}`;
    const res = await got(url).json<Daily>();

    return res;
  }

  async getLocation(city: string) {
    const url = `${this.apiUrl}?key=${process.env.WEATHERBIT_API_KEY}&lang=zh-tw&city=${city}`;
    const res = await got(url).json<Daily>();
    return res;
  }
}
