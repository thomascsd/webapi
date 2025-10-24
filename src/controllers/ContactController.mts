import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { ContactService } from '../services/contact/ContactServices.mjs';
import { Contact } from '../models/Contact.mjs';
import { BodyParams } from '@tsed/platform-params';

@Controller('/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/list')
  getContacts() {
    return this.contactService.getContacts();
  }

  @Post('/save')
  saveContact(@BodyParams() contact: Contact) {
    return this.contactService.saveContact(contact);
  }

  @Post('/update')
  update(@BodyParams() contact: Contact) {
    return this.contactService.updateContact(contact);
  }
}
