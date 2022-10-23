import { JsonController, Get, Post, Body } from 'routing-controllers';
import { Inject } from 'typedi';
import { Customer, Trainer } from '../../models/vehicle-driving-training';
import { CustomerService } from '../../services/vehicle-driving-training/CustomService';
import { TrainerService } from '../../services/vehicle-driving-training/TrainerService';

@Inject('PersonnelController')
@JsonController()
export class PersonnelController {
  constructor(private customerService: CustomerService, private trainerService: TrainerService) {}
  @Get('/customers')
  getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @Post('/customer/insert')
  insertCustomer(@Body() customer: Customer) {
    return this.customerService.saveCustomer(customer);
  }

  @Post('/customer/update')
  updateCustomer(@Body() customer: Customer) {
    return this.customerService.updateCustomer(customer);
  }

  @Get('/trainers')
  getTrainers(): Promise<Trainer[]> {
    return this.trainerService.getTrainers();
  }

  insertTrainer(@Body() trainer: Trainer) {
    return this.trainerService.saveTrainer(trainer);
  }
}
