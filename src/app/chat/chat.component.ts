import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

const mediaConstrains = {
  audio: true,
  video: {width: 1920, height: 1080}
};


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {

  private localStream: MediaStream;
  @ViewChild('local_video') localVideo: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.requestMediaDevices();
    this.pauseLocalVideo();
    this.startLocalVideo();
  }


  private async requestMediaDevices(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstrains);
    this.localVideo.nativeElement.srcObject = this.localStream;
  }

  pauseLocalVideo(): void {
    this.localStream.getTracks().forEach(track => {
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
  }

  startLocalVideo(): void {
    this.localStream.getTracks().forEach(track => {
      track.enabled = true;
    });
    this.localVideo.nativeElement.srcObject = this.localStream;
  }

}
