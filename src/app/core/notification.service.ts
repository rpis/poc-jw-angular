import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  ws: WebSocket | null = null;
  messages: any[] = [];
  authenticated: boolean = false;
  notificationCounter$ = new Subject<number>();

  constructor(private configService: ConfigService) {
    configService.$configurationInitialized.subscribe((isInitialized) => {
      console.log("isInitialized = " + isInitialized);
      this.ws = new WebSocket(
        this.configService.pubSubUrl,
        "json.webpubsub.azure.v1"
      );
      if (this.ws != null)
        this.ws.onopen = () => {
          // Do things when the WebSocket connection is established
          console.log("open");
          if (this.ws != null)
            this.ws.send(
              JSON.stringify({
                type: "joinGroup",
                group: "test",
                ackId: 1, // ackId is optional, use ackId to make sure this action is executed
              })
            );
          console.log("send joinGroup");
        };
      if (this.ws != null)
        this.ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          if (data.type === "message") {
            // Do things when messages are received.
            console.log("message" + data.data);
            this.messages.push(JSON.parse(data.data));
            this.notificationCounter$.next(this.messages.length);
          }
        };
    });
  }

  get messagesCount(): number {
    return this.messages.length;
  }
}
