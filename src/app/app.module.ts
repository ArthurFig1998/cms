import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { ContactsDetailComponent } from "./contacts/contacts-detail/contacts-detail.component";
import { HeaderComponent } from "./header.component";
import { ContactItemComponent } from "./contacts/contact-item/contact-item.component";
import { DocumentsComponent } from "./documents/documents.component";
import { DocumentListComponent } from "./documents/document-list/document-list.component";
import { DocumentItemComponent } from "./documents/document-item/document-item.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { MessagesComponent } from "./messages/messages.component";
import { MessageItemComponent } from "./messages/message-item/message-item.component";
import { MessageEditComponent } from "./messages/message-edit/message-edit.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";
import { DropdownDirective } from "./dropdown.directive";
import { from } from "rxjs";
import { AppRoutingModule } from "./app-routing.module";
import { DocumentViewComponent } from "./documents/document-view/document-view.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { WindRefService } from "./wind-ref.service";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";

import { DndModule } from "ng2-dnd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactListComponent,
    ContactsDetailComponent,
    HeaderComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentViewComponent,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DndModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule {}
