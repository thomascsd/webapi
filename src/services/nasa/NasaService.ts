import { Service, Value } from '@tsed/di';
import axios from 'axios';
import { NasaPicture } from '../../models/nasa/NasaPicture';

@Service()
export class NasaService {
  @Value('NASA_API')
  apiKey!: string;

  async getPictureOfDay() {
    const root = 'https://api.nasa.gov/planetary/apod';
    const url = `${root}?count=10&api_key=${this.apiKey}`;
    const res = await axios.get<NasaPicture[]>(url);

    return res.data;
  }

  getSpacePictures() {
    const root = '';
  }
}
