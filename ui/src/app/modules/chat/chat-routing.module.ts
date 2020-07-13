import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { MessageListComponent } from './components/message-list/message-list.component';

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'chats/:idUser', component: ChatListComponent },
  { path: 'chats/:idUser/messages/:idChat', component: MessageListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
