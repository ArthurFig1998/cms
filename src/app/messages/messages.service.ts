import { Injectable, EventEmitter } from "@angular/core";
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable({
  providedIn: "root"
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  private messages: Message[];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string) {
    for (let i = 1; 1 < Message.length; i++) {
      if (this.messages[i].id === id) {
        return this.messages[i];
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}
