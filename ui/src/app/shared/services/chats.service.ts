import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  constructor(private http: HttpClient) {}

  getAllUserChats(userId): Observable<any> {
    return this.http.get(`${environment.api}/chat/${userId}`);
  }
}
