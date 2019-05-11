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

@Component({
  selector: "cms-message-edit",
  templateUrl: "./message-edit.component.html",
  styleUrls: ["./message-edit.component.css"]
})
export class MessageEditComponent implements OnInit {
  @ViewChild("subject") subjectInputRef: ElementRef;
  @ViewChild("msgText") msgTextInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Arthur";

  constructor() {}

  ngOnInit() {}

  onSendMessage() {
    const newSubject = this.subjectInputRef.nativeElement.value;
    const newMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(
      "1",
      newSubject,
      newMsgText,
      this.currentSender
    );
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
