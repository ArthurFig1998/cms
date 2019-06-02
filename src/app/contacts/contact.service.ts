import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contacts.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactChangeEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  private contacts: Contact[];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(index: string) {
    // for (let i = 1; 1 < Contact.length; i++) {
    //   if (this.contacts[i].id === id) {
    //     return this.contacts[i];
    //   }
    // }
    // return null;
    return this.contacts[index];
  }

  deleteContact(contact: Contact) {
    if (document === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangeEvent.emit(this.contacts.slice());
  }
}
