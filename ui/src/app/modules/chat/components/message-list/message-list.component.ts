import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Message } from 'src/app/shared/models/message.model';
import { Socket } from 'ngx-socket-io';

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
    private messagesService: MessagesService,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.chatId = params.get('idChat');
      this.userId = params.get('idUser');
      this.getAllMessages();
    });
    this.socket.on('messages', (data) => {
      if (data.body[0].chat !== this.chatId) {
        console.log('NO HAY MENSAJES NUEVOS PARA TU CHAT');
      } else {
        console.log('REFRESCAR MENSAJES');
        this.messages = data.body;
      }
      this.getAllMessages();
    });
  }

  async getAllMessages() {
    this.messagesService.getAllChatMessages(this.chatId).subscribe((data) => {
      console.log(data);
      this.messages = data.body;
    });
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
        .subscribe((data) => {
          this.socket.emit('getMessages', this.chatId, (result) => {
            if (result.body[0].chat !== this.chatId) {
              console.log('NO HAY MENSAJES NUEVOS PARA TU CHATID');
            } else {
              console.log('REFRESCAR MENSAJES');
              this.messages = result.body;
            }
          });
          this.getAllMessages();
          this.clearInputMessage();
        });
    }
  }

  clearInputMessage() {
    this.newMessage = '';
  }
}
