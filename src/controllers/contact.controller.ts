import { Controller, GET } from 'fastify-decorators';
import { Inject } from 'typedi';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contactService.js';

@Controller('/contact')
export default class ContactController {
  @Inject()
  contactService: ContactService;

  @GET('/')
  async getContracts() {
    return await this.contactService.getContacts();
  }
}
