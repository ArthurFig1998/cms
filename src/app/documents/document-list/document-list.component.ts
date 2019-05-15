import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Document } from "../document.model";

@Component({
  selector: "cms-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.css"]
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      "1",
      "CIT 260 - Objected Oriented Programming",
      "description2",
      "url2",
      null
    ),
    new Document(
      "2",
      "CIT 366 - Full Web Stack Development",
      "Learn how to develop modern web applications using the MEAN stack",
      "https://content.byui.edu/file/",
      null
    ),
    new Document(
      "3",
      "CIT 425 - Data Warehousing",
      "description3",
      "url3",
      null
    ),
    new Document(
      "4",
      "CIT 460 - Enterprise Development",
      "description2",
      "url2",
      null
    ),
    new Document(
      "5",
      "CIT 495 - Senior Practicum",
      "description3",
      "url3",
      null
    )
  ];

  constructor() {}

  ngOnInit() {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
