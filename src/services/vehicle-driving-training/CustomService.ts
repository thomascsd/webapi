import { DataService } from '../DataService';
import { Service } from 'typedi';
import { Customer, Trainer } from '../../models/vehicle-driving-training';

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
  async saveCustomer(customer: Customer) {
    await this.db.saveData(BASE_ID, 'customer', customer);
  }

  async updateCustomer(customer: Customer) {
    await this.db.updateData(BASE_ID, 'customer', customer);
  }
}
