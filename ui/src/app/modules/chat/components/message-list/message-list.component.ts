import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  chatId: string;
  userId: string;
  newMessage = '';
  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.chatId = params.get('idChat');
      this.userId = params.get('idUser');
      this.getAllMessages();
    });
  }

  async getAllMessages() {
    // this.messagesService.getAllChatMessages(this.chatId).subscribe((data) => {
    //   console.log(JSON.parse(data));
    //   this.messages = JSON.parse(data).body;
    // });
    const messages = await this.messagesService.getAllChatMessages(this.chatId);
    console.log(JSON.parse(messages));
    this.messages = JSON.parse(messages).body;
  }

  sendNewMessage() {
    if (this.newMessage == '') {
      window.alert('Please, write something');
    } else {
      this.messagesService
        .createMessage({
          message: this.newMessage,
          chat: this.chatId,
          user: this.userId,
        })
        .then((data) => {
          this.getAllMessages();
          this.clearInputMessage();
        });
    }
  }

  clearInputMessage() {
    this.newMessage = '';
  }
}
