import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Contact } from "../contacts.model";
import { ContactService } from "../contact.service";

@Component({
  selector: "cms-contact-edit",
  templateUrl: "./contact-edit.component.html",
  styleUrls: ["./contact-edit.component.css"]
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      if (this.id === null || this.id === undefined) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (this.originalContact === null || this.originalContact === undefined) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      // if(contact group part)
    });
  }
}
