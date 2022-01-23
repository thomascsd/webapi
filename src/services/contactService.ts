import { DataService, API_KEY_TOKEN } from '@thomascsd/stools';
import { Inject, Container, Service } from 'typedi';
import { Contact } from '../models/contact';

Container.set(API_KEY_TOKEN, process.env.AIRTABLE_API);
const BASE_ID = 'appLdD9UKehdDawCn';

@Service()
export class ContactService {
  @Inject()
  db: DataService;

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
