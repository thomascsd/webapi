import { Service, Value } from '@tsed/di';
import axios from 'axios';
import { NasaPictureOfDay } from '../../models/nasa/NasaPictureOfDay.mjs';
import { NasaImage, NasaImageItem } from '../../models/nasa/NasaImage.mjs';
import { NasaAsset } from '../../models/nasa/NasaAsset.mjs';

@Service()
export class NasaService {
  @Value('NASA_API')
  apiKey!: string;

  async getPictureOfDay() {
    const APOD_ROOT = 'https://api.nasa.gov/planetary/apod';
    const url = `${APOD_ROOT}?count=10&api_key=${this.apiKey}`;
    try {
      const res = await axios.get<NasaPictureOfDay[]>(url);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get picture of day');
    }
  }

  async getSpacePictures(): Promise<NasaImageItem[]> {
    const root = 'https://images-api.nasa.gov/search';
    const url = `${root}?year_start=2010&year_end=${new Date().getFullYear()}&page=1&media_type=image&q=`;
    let images: NasaImageItem[] = [];

    await Promise.all([this.getPicture(url + 'galexy'), this.getPicture(url + 'supernova')]).then(
      ([galaxy, supernova]) => {
        images = [...galaxy.collection.items, ...supernova.collection.items];
      },
    );

    return images;
  }

  async getAsset(nasaId: string): Promise<NasaAsset> {
    const url = `https://images-api.nasa.gov/asset/${nasaId}`;
    const res = await axios.get<NasaAsset>(url);
    return res.data;
  }

  private getPicture(url: string): Promise<NasaImage> {
    return axios.get<NasaImage>(url).then((res) => res.data);
  }
}
