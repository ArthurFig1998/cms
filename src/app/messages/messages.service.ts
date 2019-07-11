import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { DataStorageService } from "../shared/data-storage.service";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessagesService implements OnInit {
  messageChangeEvent = new Subject<Message[]>();
  private messages: Message[];
  maxMessageId: number;
  maxId: number = 0;
  currentId: number;

  constructor(
    private dataStorage: DataStorageService,
    private http: HttpClient
  ) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
    // this.messages = this.initMessages();
    console.log("Im being called - Constructor");
    this.initMessages();
  }

  ngOnInit() {
    this.getMessages();
    console.log("I'm being called - ngOnInit");
  }

  getMaxId() {
    this.messages.forEach((message: Message) => {
      this.currentId = +message.id;
      if (this.currentId > this.maxMessageId) {
        this.maxId = this.currentId;
      }
    });

    return this.maxId;
  }

  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string) {
    // for (let i = 1; 1 < Message.length; i++) {
    //   if (this.messages[i].id === id) {
    //     return this.messages[i];
    //   }
    // }
    // return null;
    return this.messages[id];
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.next(this.messages.slice());
    this.storeMessages();
  }

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageChangeEvent.next(this.messages.slice());
  }

  initMessages() {
    this.http
      .get<Message[]>("http://localhost:3000/messages")
      .subscribe(message => {
        console.log("I'm being called - initMessages");
        this.setMessages(message);
      });
  }

  storeMessages() {
    const messages = JSON.stringify(this.getMessages());
    this.http
      .put("http://localhost:3000/messages.json", messages)
      .subscribe(response => {
        console.log(response);
      });
  }
}
