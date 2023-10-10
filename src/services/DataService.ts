import AsyncAirtable from 'asyncairtable';
import { AirtableRecord, DeleteResponse, SelectOptions } from 'asyncairtable/lib/@types';
import { BaseModel } from '@thomascsd/stools-models';
import { Service, Value } from '@tsed/di';

@Service()
export class DataService {
  @Value('AIRTABLE_API')
  apiKey!: string;

  /**
   * Get Datas from AirTable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {SelectOptions} [options]
   * @return {*}  {Promise<T[]>}
   * @memberof DataService
   */
  async getData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    options?: SelectOptions
  ): Promise<T[]> {
    const airtable = this.getAirTableClient(baseId);
    const records: AirtableRecord[] = await airtable.select(tableName, options);

    const body = records
      .map((o: AirtableRecord) => {
        const fields = o.fields;
        fields.id = o.id;
        return fields;
      })
      .map((fields) => {
        const obj: Record<string, unknown> = { ...fields };
        return obj;
      }) as T[];

    return body;
  }

  /**
   * Insert data to Airtable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {T} model
   * @return {*}  {Promise<AirtableRecord>}
   * @memberof DataService
   */
  async saveData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T,
    typecast?: boolean | undefined
  ): Promise<AirtableRecord> {
    const airtable = this.getAirTableClient(baseId);
    const body = await airtable.createRecord(tableName, model, typecast);
    return body;
  }

  /**
   * Update data to AirTable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {T} model
   * @return {*}  {Promise<AirtableRecord>}
   * @memberof DataService
   */
  async updateData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<AirtableRecord> {
    const airtable = this.getAirTableClient(baseId);
    const tmpModel = { ...model };
    const id = tmpModel.id;
    delete tmpModel.id;
    const body = await airtable.updateRecord(tableName, {
      id: id as string,
      fields: tmpModel,
    });

    return body;
  }

  /**
   * Delete data from AirTable
   *
   * @template T
   * @param {string} baseId
   * @param {string} tableName
   * @param {T} model
   * @return {*}  {Promise<DeleteResponse>}
   * @memberof DataService
   */
  async deleteData<T extends BaseModel>(
    baseId: string,
    tableName: string,
    model: T
  ): Promise<DeleteResponse> {
    const airtable = this.getAirTableClient(baseId);

    const res = await airtable.deleteRecord(tableName, model.id as string);
    return res;
  }

  private getAirTableClient(baseId: string) {
    const airtable = new AsyncAirtable(this.apiKey, baseId);

    return airtable;
  }
}
