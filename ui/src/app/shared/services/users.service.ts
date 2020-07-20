import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private socket: Socket) {}

  getAllUsers(): Observable<any> {
    // return this.http.get(`${environment.api}/user`);
    this.socket.emit('getUsers');
    return this.socket.fromEvent<any>('getUsers').pipe(map((data) => data));
  }
}
