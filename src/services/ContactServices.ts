import { Service } from '@tsed/di';
import { DataService } from './DataService';
import { Contact } from '../models/Contact';

const BASE_ID = 'appLdD9UKehdDawCn';

@Service()
export class ContactService {
  constructor(private db: DataService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getDatas<Contact>(BASE_ID, 'contact');
  }

  async saveContact(contact: Contact): Promise<string> {
    await this.db.saveData<Contact>(BASE_ID, 'contact', contact);
    return 'Contact saved successfully';
  }

  async updateContact(contact: Contact): Promise<string> {
    await this.db.updateData<Contact>(BASE_ID, 'contact', contact);
    return 'Contact updated successfully';
  }
}
