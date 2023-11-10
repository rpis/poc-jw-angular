import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ConfigService } from "./core/config.service";
import { DynamicListComponent } from "./components/dynamic-list/dynamic-list.component";
import { StoreService } from "./core/store.service";
import { Subject } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  loginDisplay = true;
  notificationCounter$ = new Subject<number>();

  login() {}

  logout() {}

  showMessages() {}
}
