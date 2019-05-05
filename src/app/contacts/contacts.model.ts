export class Contact {
  constructor(
    public contactId: string,
    public name: string,
    public email: string,
    public phone: string,
    public imgUrl: string,
    public group: []
  ) {}
}
