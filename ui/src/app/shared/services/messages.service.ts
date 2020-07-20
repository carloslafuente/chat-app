import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient, private socket: Socket) {}

  chatIdToGet = '';

  getAllChatMessages(chatId): Promise<any> {
    // return this.http.get(`${environment.api}/message?chat=${chatId}`);
    return new Promise((resolve, reject) => {
      this.chatIdToGet = chatId;
      this.socket.emit('getMessages', this.chatIdToGet);
      this.socket.on('messages', (data) => {
        resolve(data);
      });
    });
    // return this.socket.fromEvent<any>('messages').pipe(map((data) => data));
  }

  createMessage(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('postMessage', {
        message: body,
        filter: this.chatIdToGet,
      });
      this.socket.on('messages', (data) => {
        resolve(data);
      });
    });
    // return this.http.post(`${environment.api}/message`, body);
    // this.socket.emit('postMessage', {
    //   message: body,
    //   fileter: this.chatIdToGet,
    // });
  }
}
