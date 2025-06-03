import { Factory } from 'fishery';
import { Address, AddressResponse } from '../models/address';

class AddressFactory extends Factory<AddressResponse> {
  make(): Address {
    return Address.createFromSource(this.build());
  }

  makeList(number: number): Address[] {
    return this.buildList(number).map((value) =>
      Address.createFromSource(value),
    );
  }

  street(street: string): this {
    return this.params({ street });
  }

  post_code(postCode: string): this {
    return this.params({ post_code: postCode });
  }
}
export const addressFactory = AddressFactory.define(() => ({
  street: '123 Main St',
  post_code: '12345',
}));
