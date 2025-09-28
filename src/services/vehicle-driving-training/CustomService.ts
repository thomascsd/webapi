import { Service } from '@tsed/di';
import { BaseDataService } from '../DataService';
import { Customer, Schedule, Trainer } from '../../models/vehicle-driving-training';
import { BaseObj, CustomerDto, CustomerRes, UpdateCustomerDto } from '../../dtos';

const BASE_ID = 'appGxC02yunTmPXRh';

@Service()
export class CustomerService {
  constructor(private db: BaseDataService) {}
  async getCustomers(): Promise<CustomerRes[]> {
    const customers = await this.db.getData<Customer>(this.db.apiKey, BASE_ID, 'customer');
    const trainers = await this.db.getData<Trainer>(this.db.apiKey, BASE_ID, 'trainer');
    const schedules = await this.db.getData<Schedule>(this.db.apiKey, BASE_ID, 'schedule');
    const customerRes: CustomerRes[] = [];

    for (const customer of customers) {
      const trainer = trainers.find((m) => m.id === customer.trainerId[0]);
      const schedule = schedules.find((m) => m.customerId === customer.id);

      if (trainer && schedule) {
        customerRes.push({
          custId: customer.custId,
          name: customer.name,
          mobile: customer.mobile,
          memo: customer.memo,
          trainer,
          schedule,
        });
      }
    }

    return customerRes;
  }
  async saveCustomer(customerDto: CustomerDto): Promise<BaseObj> {
    const now = new Date();

    const schedule: Schedule = {
      morning: customerDto.moning,
      afternoon: customerDto.afternoon,
      evening: customerDto.evening,
      createUser: customerDto.createUser,
      createTime: now,
    };

    const insertedSchedule = await this.db.saveData(this.db.apiKey, BASE_ID, 'schedule', schedule);

    const customer: Customer = {
      custId: customerDto.custId,
      name: customerDto.name,
      mobile: customerDto.mobile,
      birthday: customerDto.birthday,
      memo: customerDto.memo,
      createUser: customerDto.createUser,
      createTime: now,
      schedule: [insertedSchedule.records[0].id],
      trainerId: [customerDto.trainerId],
    };

    await this.db.saveData(this.db.apiKey, BASE_ID, 'customer', customer);

    return { success: true };
  }

  async updateCustomer(customerDto: UpdateCustomerDto): Promise<BaseObj> {
    const now = new Date();
    const customer: Customer = {
      custId: customerDto.custId,
      name: customerDto.name,
      mobile: customerDto.mobile,
      birthday: customerDto.birthday,
      memo: customerDto.memo,
      createUser: customerDto.createUser,
      createTime: now,
      schedule: [customerDto.id],
      trainerId: [customerDto.trainerId],
    };

    await this.db.updateData(this.db.apiKey, BASE_ID, 'customer', customer);

    return { success: true };
  }
}
