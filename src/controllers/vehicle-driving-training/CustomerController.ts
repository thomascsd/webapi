import { BodyParams } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { Customer } from '../../models/vehicle-driving-training';
import { CustomerService } from '../../services/vehicle-driving-training/CustomService';

@Controller('/customer')
export class PersonnelController {
  constructor(private customerService: CustomerService) {}
  @Get()
  getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @Post('/insert')
  insertCustomer(@BodyParams() customer: Customer) {
    return this.customerService.saveCustomer(customer);
  }

  @Post('/update')
  updateCustomer(@BodyParams() customer: Customer) {
    return this.customerService.updateCustomer(customer);
  }
}
