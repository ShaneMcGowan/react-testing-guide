import { Factory } from 'fishery';
import { User, UserResponse } from '../models/user';
import { faker } from '@faker-js/faker';
import { addressFactory } from './addressFactory';

class UserFactory extends Factory<UserResponse> {
  make(): User {
    return User.createFromSource(this.build());
  }

  makeList(number: number): User[] {
    return this.buildList(number).map((value) => User.createFromSource(value));
  }

  userId(value: string): this {
    return this.params({
      id: value,
    });
  }

  firstName(value: string): this {
    return this.params({
      first_name: value,
    });
  }

  lastName(value: string): this {
    return this.params({
      last_name: value,
    });
  }

  address(value: UserResponse['address']): this {
    return this.params({
      address: value,
    });
  }

  admin(): this {
    return this.params({
      id: `admin-${faker.string.uuid()}`,
      first_name: 'Admin',
      last_name: 'User',
      address: null,
    });
  }
}

export const userFactory = UserFactory.define(() => ({
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  address: addressFactory.build(),
}));
