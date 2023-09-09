import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { ContactService } from '../services/contact/ContactServices';
import { Contact } from '../models/Contact';
import { BodyParams } from '@tsed/common';

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
