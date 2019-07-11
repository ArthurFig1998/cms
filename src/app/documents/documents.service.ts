import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject } from "rxjs";
import { Params } from "@angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DocumentsService implements OnInit {
  documentChangeEvent = new Subject<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[];

  maxDocumentId: number;
  maxId: number = 0;
  currentId: number;
  documentsListClone: Document[];
  newDocId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.documentChangeEvent.next(this.documents.slice());
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
    if (!document) {
      return;
    }

    this.http
      .delete("http://localhost:3000/documents/" + document.id)
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.documentChangeEvent.next(this.documents.slice());
      });

    // const pos = this.documents.indexOf(document);
    // if (pos < 0) {
    //   return;
    // }

    // this.documents.splice(pos, 1);
    // this.documentsListClone = this.documents.slice();
    // this.documentChangeEvent.next(this.documentsListClone);
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
    if (!newDocument) {
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    newDocument.id = "";

    const strDocument = JSON.stringify(newDocument);
    this.http
      .post("http://localhost:3000/documents", strDocument, {
        headers: headers
      })
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.documentChangeEvent.next(this.documents.slice());
      });

    // this.maxDocumentId++;
    // this.newDocId = +newDocument.id;
    // this.newDocId = this.maxDocumentId;
    // this.documents.push(newDocument);
    // this.documentsListClone = this.documents.slice();

    // this.documentChangeEvent.next(this.documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    const strDocument = JSON.stringify(newDocument);

    this.http
      .patch(
        "http://localhost:3000/documents/" + originalDocument.id,
        strDocument,
        { headers: headers }
      )
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.documentChangeEvent.next(this.documents.slice());
      });

    // newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // this.documentsListClone = this.documents.slice();
    // this.documentChangeEvent.next(this.documentsListClone);
  }

  getDocuments() {
    return this.documents.slice();
  }

  ngOnInit() {
    this.getDocuments();
  }
}
