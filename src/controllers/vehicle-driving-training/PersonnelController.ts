import { BodyParams } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { Customer, Trainer } from '../../models/vehicle-driving-training';
import { CustomerService } from '../../services/vehicle-driving-training/CustomService';
import { TrainerService } from '../../services/vehicle-driving-training/TrainerService';

@Controller('/customers')
export class PersonnelController {
  constructor(private customerService: CustomerService, private trainerService: TrainerService) {}
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

  @Get('/trainers')
  getTrainers(): Promise<Trainer[]> {
    return this.trainerService.getTrainers();
  }

  insertTrainer(@BodyParams() trainer: Trainer) {
    return this.trainerService.saveTrainer(trainer);
  }
}
