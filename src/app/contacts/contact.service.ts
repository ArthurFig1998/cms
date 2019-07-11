import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contacts.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs";
import { Params } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactChangeEvent = new Subject<Contact[]>();
  maxContactId: number;
  maxId: number = 0;
  currentId: number;
  contactsListClone: Contact[];
  newContactId: number;

  private contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();

    // this.http
    //   .get<{ contacts: Contact[] }>("https://arthurfig-cms.firebaseio.com/")
    //   .subscribe(contacts => {
    //     this.contacts = contacts;
    //   });
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
    if (!contact) {
      return;
    }

    this.http
      .delete("http://localhost:3000/contacts/" + contact.id)
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactChangeEvent.next(this.contacts.slice());
      });
    // if (document === null) {
    //   return;
    // }

    // const pos = this.contacts.indexOf(contact);
    // if (pos < 0) {
    //   return;
    // }

    // this.contacts.splice(pos, 1);
    // this.contactChangeEvent.next(this.contacts.slice());
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

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    newContact.id = "";

    const strDocument = JSON.stringify(newContact);
    this.http
      .post("http://localhost:3000/contacts", strDocument, {
        headers: headers
      })
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactChangeEvent.next(this.contacts.slice());
      });
    // if (newContact === null || newContact === undefined) {
    //   return;
    // }
    // this.maxContactId++;
    // this.newContactId = +newContact.id;
    // this.newContactId = this.maxContactId;
    // this.contacts.push(newContact);
    // this.contactsListClone = this.contacts.slice();

    // this.contactChangeEvent.next(this.contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    const strDocument = JSON.stringify(newContact);

    this.http
      .patch(
        "http://localhost:3000/contacts/" + originalContact.id,
        strDocument,
        { headers: headers }
      )
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactChangeEvent.next(this.contacts.slice());
      });
    // if (
    //   originalContact === undefined ||
    //   originalContact === null ||
    //   newContact === undefined ||
    //   newContact === null
    // ) {
    //   return;
    // }

    // const pos = this.contacts.indexOf(originalContact);
    // if (pos < 0) {
    //   return;
    // }

    // newContact.id = originalContact.id;
    // this.contacts[pos] = newContact;
    // this.contactsListClone = this.contacts.slice();
    // this.contactChangeEvent.next(this.contactsListClone);
  }

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contactChangeEvent.next(this.contacts.slice());
  }
}
