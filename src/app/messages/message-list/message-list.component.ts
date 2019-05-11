import { Component, OnInit } from "@angular/core";
import { Message } from "../message.model";
@Component({
  selector: "cms-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message("1", "SubjectTest", "Test Massage!", "Test Sender"),
    new Message(
      "2",
      "AnotherSubjectTest",
      "Another Test Massage!",
      "Another Test Sender"
    ),
    new Message(
      "3",
      "AnotherAnotherSubjectTest",
      "AnotherAnother Test Massage!",
      "AnotherAnother Test Sender"
    )
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
  constructor() {}

  ngOnInit() {}
}
