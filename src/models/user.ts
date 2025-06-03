import { Address, AddressResponse } from './address';

export type UserResponse = {
  id: string;
  first_name: string;
  last_name: string;
  address: AddressResponse | null;
};

export class User {
  id: string;

  firstName: string;

  lastName: string;

  address: Address | null;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get hasAddress(): boolean {
    return this.address !== null;
  }

  constructor(userData: Partial<User> = {}) {
    this.id = userData?.id || '';
    this.firstName = userData?.firstName || '';
    this.lastName = userData?.lastName || '';
    this.address = userData?.address ? new Address(userData.address) : null;
  }

  static createFromSource(response: UserResponse): User {
    const user = new User({});

    user.id = response.id;
    user.firstName = response.first_name;
    user.lastName = response.last_name;
    user.address = response.address
      ? Address.createFromSource(response.address)
      : null;

    return user;
  }
}
