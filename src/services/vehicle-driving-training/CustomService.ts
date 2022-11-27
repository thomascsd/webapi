import { DataService } from '@thomascsd/stools';
import { Service } from 'typedi';
import { Customer, Trainer } from '../../models/vehicle-driving-training';

const BASE_ID = 'appGxC02yunTmPXRh';

@Service()
export class CustomerService {
  constructor(private db: DataService) {}
  async getCustomers(): Promise<Customer[]> {
    const customers = await this.db.getDatas<Customer>(BASE_ID, 'customer');
    const trainers = await this.db.getDatas<Trainer>(BASE_ID, 'trainer');

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
