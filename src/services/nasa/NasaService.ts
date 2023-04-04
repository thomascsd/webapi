import { Service, Value } from '@tsed/di';
import axios from 'axios';
import { NasaPictureOfDay } from '../../models/nasa/NasaPictureOfDay';
import { NasaImage, NasaImageItem } from '../../models/nasa/NasaImage';
import { NasaAsset } from '../../models/nasa/NasaAsset';

@Service()
export class NasaService {
  @Value('NASA_API')
  apiKey!: string;

  async getPictureOfDay() {
    const root = 'https://api.nasa.gov/planetary/apod';
    const url = `${root}?count=10&api_key=${this.apiKey}`;
    const res = await axios.get<NasaPictureOfDay[]>(url);

    return res.data;
  }

  async getSpacePictures(): Promise<NasaImageItem[]> {
    const root = 'https://images-api.nasa.gov/search';
    let url = `${root}?year_start=2010&year_end=${new Date().getFullYear()}&page=1&media_type=image&q=`;
    let images: NasaImageItem[] = [];

    await Promise.all([this.getPricture(url + 'galexy'), this.getPricture(url + 'supernova')]).then(
      ([galaxy, supernova]) => {
        images = [...galaxy.collection.items, ...supernova.collection.items];
      }
    );

    return images;
  }

  async getAsset(nasaId: string): Promise<NasaAsset> {
    const url = `https://images-api.nasa.gov/asset/${nasaId}`;
    const res = await axios.get<NasaAsset>(url);
    return res.data;
  }

  private getPricture(url: string): Promise<NasaImage> {
    return axios.get<NasaImage>(url).then((res) => res.data);
  }
}
