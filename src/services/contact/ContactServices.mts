import { BaseDataService } from '../DataService.mjs';
import { Service } from '@tsed/di';
import { Contact } from '../../models/Contact.mjs';

const BASE_ID = 'appLdD9UKehdDawCn';

@Service()
export class ContactService {
  constructor(private db: BaseDataService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getData<Contact>(this.db.apiKey, BASE_ID, 'contact');
  }

  async saveContact(contact: Contact) {
    await this.db.saveData<Contact>(this.db.apiKey, BASE_ID, 'contact', contact);
    return 'ok';
  }

  async updateContact(contact: Contact) {
    await this.db.updateData<Contact>(this.db.apiKey, BASE_ID, 'contact', contact);
    return 'ok';
  }
}
