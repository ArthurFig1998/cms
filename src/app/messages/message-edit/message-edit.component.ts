import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { stringify } from "@angular/core/src/util";
import { Message } from "../message.model";
import { MessagesService } from "../messages.service";

@Component({
  selector: "cms-message-edit",
  templateUrl: "./message-edit.component.html",
  styleUrls: ["./message-edit.component.css"]
})
export class MessageEditComponent implements OnInit {
  @ViewChild("subject") subjectInputRef: ElementRef;
  @ViewChild("msgText") msgTextInputRef: ElementRef;

  currentSender: string = "10";

  constructor(private messageService: MessagesService) {}

  ngOnInit() {
    console.log("Current Sender is: " + this.currentSender);
  }

  onSendMessage() {
    const newSubject = this.subjectInputRef.nativeElement.value;
    const newMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(
      "1",
      newSubject,
      newMsgText,
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
    console.log("Current Sender is: " + this.currentSender);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
