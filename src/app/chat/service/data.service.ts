import {Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Subject} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {Message} from '../types/message';

export const WS_ENDPOINT = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket$: WebSocketSubject<Message>;

  private messagesSubject = new Subject<Message>();

  public messages$ = this.messagesSubject.asObservable();

  public connect(): void {
    this.socket$ = this.getNewWebSocket();

    this.socket$.subscribe(
      msg => {
        console.log('Received message of types:' + msg.type);
        this.messagesSubject.next(msg);
      }
    );
  }

  sendMessage(msg: { data: string; type: string }): void {
    console.log('sending message: ' + msg.type);
    // console.log('sending message: ' );

    // this.socket$.next(msg);
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('[DataService]: connection ok');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = undefined;
          this.connect();
        }
      }
    });
  }
}

