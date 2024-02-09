import { BodyParams } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { Authorize } from '@tsed/passport';
import { CustomerService } from '../../services/vehicle-driving-training/CustomService';
import { CustomerDto, CustomerRes, UpdateCustomerDto } from '../../dtos';

@Controller('/customer')
@Authorize('jwt')
export class PersonnelController {
  constructor(private customerService: CustomerService) {}
  @Get()
  getCustomers(): Promise<CustomerRes[]> {
    return this.customerService.getCustomers();
  }

  @Post('/insert')
  insertCustomer(@BodyParams() customer: CustomerDto) {
    return this.customerService.saveCustomer(customer);
  }

  @Post('/update')
  updateCustomer(@BodyParams() customerDto: UpdateCustomerDto) {
    return this.customerService.updateCustomer(customerDto);
  }
}
