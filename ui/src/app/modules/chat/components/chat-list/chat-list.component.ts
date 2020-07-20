import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from 'src/app/shared/services/chats.service';
import { Chat } from 'src/app/shared/models/chat.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private chatsService: ChatsService
  ) {}

  chats: Chat[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((user) => {
      let userId = user.idUser;
      this.chatsService.getAllUserChats(userId).subscribe((chats) => {
        this.chats = chats.body;
      });
    });
  }
}
