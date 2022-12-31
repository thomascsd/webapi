import axios from 'axios';
import { Service } from 'typedi';
import { Daily } from '../../models/weathers/daily';

@Service()
export class ForecastService {
  apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

  async getDays(lat: number, lon: number) {
    const url = `${this.apiUrl}?key=${process.env.WEATHERBIT_API_KEY}&lang=zh-tw&lat=${lat}&lon=${lon}`;
    const res = await axios.get<Daily>(url);

    return res.data;
  }

  async getLocation(city: string) {
    const url = `${this.apiUrl}?key=${process.env.WEATHERBIT_API_KEY}&lang=zh-tw&city=${city}`;
    const res = await axios.get<Daily>(url);
    return res.data;
  }
}
