import { DataService } from '../DataService';
import { Service } from 'typedi';
import { Customer, Schedule, Trainer } from '../../models/vehicle-driving-training';
import { CustomerDto, CustomerRes, UpdateCustomerDto } from '../../dtos';

const BASE_ID = 'appGxC02yunTmPXRh';

@Service()
export class CustomerService {
  constructor(private db: DataService) {}
  async getCustomers(): Promise<CustomerRes[]> {
    const customers = await this.db.getData<Customer>(BASE_ID, 'customer');
    const trainers = await this.db.getData<Trainer>(BASE_ID, 'trainer');
    const schedules = await this.db.getData<Schedule>(BASE_ID, 'schedule');
    const customerRes: CustomerRes[] = [];

    for (const customer of customers) {
      const trainer = trainers.find((m) => m.id === customer.trainerId[0]);
      const schedule = schedules.find((m) => m.customerId === customer.id);

      if (trainer) {
        customer.trainer = trainer;
      }

      customerRes.push({
        custId: customer.custId,
        name: customer.name,
        mobile: customer.mobile,
        memo: customer.memo,
        trainer,
        schedule,
      });
    }

    return customerRes;
  }
  async saveCustomer(customerDto: CustomerDto) {
    const now = new Date();

    const schedule: Schedule = {
      morning: customerDto.moning,
      afternoon: customerDto.afternoon,
      evening: customerDto.evening,
      createUser: customerDto.createUser,
      createTime: now,
    };

    const insertedSchedule = await this.db.saveData(BASE_ID, 'schedule', schedule);

    const customer: Customer = {
      custId: customerDto.custId,
      name: customerDto.name,
      mobile: customerDto.mobile,
      memo: customerDto.memo,
      createUser: customerDto.createUser,
      createTime: now,
      schedule: [insertedSchedule.id],
      trainerId: [customerDto.trainerId],
    };

    const insertedCustomer = await this.db.saveData(BASE_ID, 'customer', customer);

    schedule.id = insertedSchedule.id;
    schedule.customerId = insertedCustomer.id;
  }

  async updateCustomer(customerDto: UpdateCustomerDto) {
    const now = new Date();
    const customer: Customer = {
      custId: customerDto.custId,
      name: customerDto.name,
      mobile: customerDto.mobile,
      memo: customerDto.memo,
      createUser: customerDto.createUser,
      createTime: now,
      schedule: [customerDto.id],
      trainerId: [customerDto.trainerId],
    };

    await this.db.updateData(BASE_ID, 'customer', customer);
  }
}
