import { Component, OnInit } from "@angular/core";
import { DocumentsService } from "../documents.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "cms-document-edit",
  templateUrl: "./document-edit.component.html",
  styleUrls: ["./document-edit.component.css"]
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(
    private documentService: DocumentsService,
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

      this.originalDocument = this.documentService.getDocument(this.id);

      if (
        this.originalDocument === null ||
        this.originalDocument === undefined
      ) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }
}
