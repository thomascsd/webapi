import { fastify } from 'fastify';
import { DataService, API_KEY_TOKEN } from '@thomascsd/stools';
import { Inject, Container, Service } from 'typedi';
import { Contact } from '../models/contact';

//@ts-ignore
Container.set(API_KEY_TOKEN, fastify.config.AIRTABLE_API);

console.log(
  '🚀 ~ file: contactService.ts ~ line 8 ~  fastify.config.AIRTABLE_API',
  //@ts-ignore
  fastify.config.AIRTABLE_API
);

const BASE_ID = 'appLdD9UKehdDawCn';

@Service()
export class ContactService {
  @Inject()
  //@ts-ignore
  db: DataService = new DataService(fastify.config.AIRTABLE_API);

  async getContacts(): Promise<Contact[]> {
    return await this.db.getDatas<Contact>(BASE_ID, 'contact');
  }

  async saveContact(contact: Contact) {
    await this.db.saveData<Contact>(BASE_ID, 'contact', contact);
    return 'ok';
  }

  async updateContact(contact: Contact) {
    await this.db.updateData<Contact>(BASE_ID, 'contact', contact);
    return 'ok';
  }
}
