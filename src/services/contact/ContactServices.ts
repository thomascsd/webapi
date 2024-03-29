import { DataService } from '../DataService';
import { Service } from '@tsed/di';
import { Contact } from '../../models/Contact';

const BASE_ID = 'appLdD9UKehdDawCn';

@Service()
export class ContactService {
  constructor(private db: DataService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getData<Contact>(BASE_ID, 'contact');
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
