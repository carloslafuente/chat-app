import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  chatIdToGet = '';

  getAllChatMessages(chatId): Observable<any> {
    return this.http.get(`${environment.api}/message?chat=${chatId}`);
  }

  createMessage(body): Observable<any> {
    return this.http.post(`${environment.api}/message`, body);
  }
}
