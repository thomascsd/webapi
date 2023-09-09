// Generated by CodiumAI

import { PlatformTest } from '@tsed/common';
import axios from 'axios';
import { NasaService } from './NasaService';

/*
Code Analysis

Main functionalities:
The NasaService class is responsible for making API requests to NASA's servers and returning data related to pictures and assets. It has methods for retrieving the picture of the day, space pictures, and assets based on their NASA ID.

Methods:
- getPictureOfDay(): retrieves the picture of the day from NASA's API and returns an array of NasaPictureOfDay objects.
- getSpacePictures(): retrieves space pictures from NASA's API and returns an array of NasaImageItem objects.
- getAsset(nasaId: string): retrieves an asset from NASA's API based on its NASA ID and returns a NasaAsset object.
- getPricture(url: string): a private method that retrieves a picture from NASA's API based on a given URL and returns a NasaImage object.

Fields:
- apiKey: a string field that stores the API key used to authenticate requests to NASA's API.
*/

describe('NasaService_class', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  // Tests that getPictureOfDay returns an array of NasaPictureOfDay objects
  it('test_get_picture_of_day_returns_array_of_nasa_picture_of_day_objects', async () => {
    const nasaService = PlatformTest.get<NasaService>(NasaService);
    const nasaPictures = await nasaService.getPictureOfDay();
    expect(Array.isArray(nasaPictures)).toBe(true);
    expect(nasaPictures.length).toBeGreaterThan(0);
    expect(nasaPictures[0]).toHaveProperty('date');
    expect(nasaPictures[0]).toHaveProperty('explanation');
    expect(nasaPictures[0]).toHaveProperty('hdurl');
    expect(nasaPictures[0]).toHaveProperty('media_type');
    expect(nasaPictures[0]).toHaveProperty('service_version');
    expect(nasaPictures[0]).toHaveProperty('title');
    expect(nasaPictures[0]).toHaveProperty('url');
  });

  // Tests that getSpacePictures returns an array of NasaImageItem objects
  it('test_get_space_pictures_returns_array_of_nasa_image_item_objects', async () => {
    const nasaService = PlatformTest.get<NasaService>(NasaService);
    const nasaImages = await nasaService.getSpacePictures();

    expect(Array.isArray(nasaImages)).toBe(true);
    expect(nasaImages.length).toBeGreaterThan(0);
    expect(nasaImages[0]).toHaveProperty('data');
    expect(nasaImages[0]).toHaveProperty('href');
    expect(nasaImages[0]).toHaveProperty('links');
  });

  // Tests that getAsset returns a NasaAsset object
  it('test_get_asset_returns_nasa_asset_object', async () => {
    const nasaService = PlatformTest.get<NasaService>(NasaService);
    const nasaAsset = await nasaService.getAsset('12345');

    expect(nasaAsset).toHaveProperty('collection');
  });

  // Tests that getPictureOfDay throws an error if API call fails
  it('test_get_picture_of_day_throws_error_if_api_call_fails', async () => {
    const nasaService = PlatformTest.get<NasaService>(NasaService);
    const mockAxios = jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Failed to get picture of day'));

    await expect(nasaService.getPictureOfDay()).rejects.toThrow('Failed to get picture of day');
    mockAxios.mockRestore();
  });

  // Tests that getSpacePictures returns an empty array if API call fails
  it('test_get_space_pictures_returns_empty_array_if_api_call_fails', async () => {
    const nasaService = PlatformTest.get<NasaService>(NasaService);
    const mockAxios = jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Failed to get space pictures'));
    const nasaImages = await nasaService.getSpacePictures();

    expect(Array.isArray(nasaImages)).toBe(true);
    expect(nasaImages.length).toBe(0);
    mockAxios.mockRestore();
  });

  // Tests that getAsset throws an error if API call fails
  it('test_get_asset_throws_error_if_api_call_fails', async () => {
    const nasaService = PlatformTest.get<NasaService>(NasaService);
    const mockAxios = jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to get asset'));

    await expect(nasaService.getAsset('12345')).rejects.toThrow('Failed to get asset');
    mockAxios.mockRestore();
  });
});
