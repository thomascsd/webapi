import { DataService } from '../DataService';
import { Service } from 'typedi';
import { Customer, Schedule, Trainer } from '../../models/vehicle-driving-training';
import { CustomerDto } from '../../dtos';

const BASE_ID = 'appGxC02yunTmPXRh';

@Service()
export class CustomerService {
  constructor(private db: DataService) {}
  async getCustomers(): Promise<Customer[]> {
    const customers = await this.db.getData<Customer>(BASE_ID, 'customer');
    const trainers = await this.db.getData<Trainer>(BASE_ID, 'trainer');

    for (const customer of customers) {
      const trainer = trainers.find((m) => m.id == customer.trainerId);

      if (trainer) {
        customer.trainer = trainer;
      }
    }

    return customers;
  }
  async saveCustomer(customerDto: CustomerDto) {
    const schedule: Schedule = new Schedule();
    const customer = new Customer();
    const now = new Date();

    schedule.morning = customerDto.moning;
    schedule.afternoon = customerDto.afternoon;
    schedule.evening = customerDto.evening;
    schedule.createTime = now;

    await this.db.saveData(BASE_ID, 'schedule', schedule);

    customer.custId = customerDto.custId;

    await this.db.saveData(BASE_ID, 'customer', customer);
  }

  async updateCustomer(customer: Customer) {
    await this.db.updateData(BASE_ID, 'customer', customer);
  }
}
