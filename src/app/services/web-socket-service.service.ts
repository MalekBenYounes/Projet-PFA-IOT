import { Injectable } from '@angular/core';
import { Observable, RetryConfig, map, retry } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private static instance: WebSocketService;
  private socket!: WebSocketSubject<any>;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public async connect(): Promise<Observable<any>> {
    const config: RetryConfig = {
      count: 10,
      delay: 3000, // 30000 in prodcution
      resetOnSuccess: true
    };
    console.log('trying to connect to the websocket server');

    if (!this.socket || this.socket.closed) {
      const url = "ws://localhost:3000";
      this.socket = webSocket(url);
    }

    return this.socket.pipe(
      map((data: any) => {
        return data;
      }),
      retry(config)
    );
  }

  close() {
    this.socket.complete();
  }
}
