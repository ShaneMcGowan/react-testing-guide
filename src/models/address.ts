export type AddressResponse = {
  street: string;
  post_code: string;
};

export class Address {
  street: string;

  postCode: string;

  get fullAddress(): string {
    return `${this.street}, ${this.postCode}`;
  }

  constructor(addressData: Partial<Address> = {}) {
    this.street = addressData.street || '';
    this.postCode = addressData?.postCode || '';
  }

  static createFromSource(response: AddressResponse): Address {
    const address = new Address({});

    address.street = response.street;
    address.postCode = response.post_code;

    return address;
  }
}
