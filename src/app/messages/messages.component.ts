import {Component, OnInit} from '@angular/core';
import {Message} from "../chat/types/message";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  message = '';

  private peerConnection: RTCPeerConnection;

  constructor() {
  }

  ngOnInit(): void {
  }

  messageInput(): void {
    const text = this.message.toString();
    console.log(text);
  }
}

