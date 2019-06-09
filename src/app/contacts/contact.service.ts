import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contacts.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactChangeEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  maxContactId: number;
  maxId: number = 0;
  currentId: number;
  contactsListClone: Contact[];
  newContactId: number;

  private contacts: Contact[];
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
    this.contactChangeEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    this.contacts.forEach((contact: Contact) => {
      this.currentId = +contact.id;
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    });

    return this.maxId;
  }

  addDocument(newContact: Contact) {
    if (newContact === null || newContact === undefined) {
      return;
    }
    this.maxContactId++;
    this.newContactId = +newContact.id;
    this.newContactId = this.maxContactId;
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();

    this.contactChangeEvent.next(this.contactsListClone);
  }

  updateDocument(originalContact: Contact, newContact: Contact) {
    if (
      originalContact === undefined ||
      originalContact === null ||
      newContact === undefined ||
      newContact === null
    ) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.contactChangeEvent.next(this.contactsListClone);
  }
}
