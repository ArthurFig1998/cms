import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contacts.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();

  private contacts: Contact[];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    for (let i = 1; 1 < Contact.length; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
    return null;
  }
}
