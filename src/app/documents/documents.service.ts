import { Injectable, EventEmitter } from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable({
  providedIn: "root"
})
export class DocumentsService {
  documentChangeEvent = new EventEmitter<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string) {
    // for (let i = 1; 1 < Document.length; i++) {
    //   if (this.documents[i].id === id) {
    //     return this.documents[i];
    //   }
    // }
    // return null;
    return this.documents[id];
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangeEvent.emit(this.documents.slice());
  }
}
