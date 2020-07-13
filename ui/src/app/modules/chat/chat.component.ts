import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  users: User[] = [];
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((users) => {
      this.users = users.body;
    });
  }
}
