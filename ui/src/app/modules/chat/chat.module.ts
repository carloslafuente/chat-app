import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { MessageListComponent } from './components/message-list/message-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersService } from '../../shared/services/users.service';
import { ChatsService } from '../../shared/services/chats.service';
import { MessagesService } from '../../shared/services/messages.service';

@NgModule({
  declarations: [ChatComponent, ChatListComponent, MessageListComponent],
  imports: [CommonModule, ChatRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [UsersService, ChatsService, MessagesService],
})
export class ChatModule {}
