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
      "An introduction to object oriented programming using the Java programming language. Students will write computer programs using primitive data types, control structures, classes, and objects. Students will read and draw UML class diagrams and will use Java swing to write programs with a graphical user interface.",
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
      "This course defines the theory and practice of data analysis. The course will compare and contrast the operational and analytical database models. Students will learn how to define, implement and query a database warehouse by leveraging sample data warehouses built from Enterprise Resource Planning (ERP) and Customer Resource Management (CRM) solutions.",
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
      "This is a capstone experience for the Computer Information Technology major. There are two options available: A research paper on a relevant Information Technology topic or participate in service learning. The purpose of this course is to build on the knowledge that students have learned in the Computer Information Technology major.",
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
