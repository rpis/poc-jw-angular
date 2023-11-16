import { Component, Inject, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ConfigService } from "./core/config.service";
import { DynamicListComponent } from "./components/dynamic-list/dynamic-list.component";
import { StoreService } from "./core/store.service";
import { Subject } from "rxjs";
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration } from "@azure/msal-angular";
import { AuthService } from "./core/auth.service";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "./core/notification.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  loginDisplay = true;
  notificationCounter$ = new Subject<number>();

  user: any;
  authServiceSubscription: any;
  isIframe = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: AuthService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.notificationCounter$ = this.notificationService.notificationCounter$;
    this.authServiceSubscription = authService.$authInfo.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.loginDisplay = true;
          this.user = this.authService.user;
        } else {
          this.loginDisplay = false;
          this.user = undefined;
        }
      }
    );
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    console.log("login");
  }

  logout() {
    this.authService.logout();
  }

  showMessages() {}
}
