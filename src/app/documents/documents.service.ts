import { Injectable, EventEmitter } from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject } from "rxjs";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DocumentsService {
  documentChangeEvent = new Subject<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[];

  maxDocumentId: number;
  maxId: number = 0;
  currentId: number;
  documentsListClone: Document[];
  newDocId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
    this.documentsListClone = this.documents.slice();
    this.documentChangeEvent.next(this.documentsListClone);
  }

  getMaxId(): number {
    this.documents.forEach((document: Document) => {
      this.currentId = +document.id;
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    });

    return this.maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }
    this.maxDocumentId++;
    this.newDocId = +newDocument.id;
    this.newDocId = this.maxDocumentId;
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice();

    this.documentChangeEvent.next(this.documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      originalDocument === undefined ||
      originalDocument === null ||
      newDocument === undefined ||
      newDocument === null
    ) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    this.documentChangeEvent.next(this.documentsListClone);
  }
}
