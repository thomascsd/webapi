import { Service, Value } from '@tsed/di';
import axios from 'axios';
import { Daily } from '../../models/weathers/daily';

@Service()
export class ForecastService {
  apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

  @Value('WEATHERBIT_API_KEY')
  apiKey!: string;

  async getDays(lat: number, lon: number) {
    const url = `${this.apiUrl}?key=${this.apiKey}&lang=zh-tw&lat=${lat}&lon=${lon}`;
    const res = await axios.get<Daily>(url);

    return res.data;
  }

  async getLocation(city: string) {
    const url = `${this.apiUrl}?key=${this.apiKey}&lang=zh-tw&city=${city}`;
    const res = await axios.get<Daily>(url);
    return res.data;
  }
}
