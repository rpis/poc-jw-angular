import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "src/app/core/auth.service";
import { NotificationService } from "src/app/core/notification.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  notificationCounter$ = new Subject<number>();
  loginDisplay = false;

  isAuth: boolean = true;
  isUserActive: boolean = true;
  isAdminOrLeader: boolean = true;
  authServiceSubscription: any;

  user: any;
  // ws: WebSocket | null = null;

  message: boolean = true;
  subject = new Subject<boolean>();
  messages: any[] = [
    {
      type: "RACH",
      id: "893b4158-aab6-479e-a05b-04990fb079b0",
      message: "Raport gotowy",
      criteria: {},
    },
    {
      type: "RACH",
      id: "8e7d7756-2df7-4858-9945-ad1c7fe2c286",
      message: "Raport gotowy",
      criteria: {},
    },
  ];
  showSidenav: boolean = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.notificationCounter$ = this.notificationService.notificationCounter$;
    this.authServiceSubscription = authService.$authInfo.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.loginDisplay = true;
          this.user = this.authService.user;
          console.log(JSON.stringify(this.user));
        } else {
          this.loginDisplay = false;
          this.user = undefined;
        }
      }
    );
  }

  ngOnInit(): void {
    //this.isAuth = this.kc.isAuthenticated()
    //const user = this.userService.getCurrentUser()
    //this.isUserActive = user?.status === 'ACTIVE'
    //this.isAdminOrLeader = user?.admin || user?.leader
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
    //this.kc.logout()
  }

  login() {}
  showMessages() {
    this.messages = [...this.notificationService.messages].reverse();
    this.showSidenav = true;
  }

  hideMessages() {
    this.showSidenav = false;
  }
  async goToMessageObject(message) {
    console.log("goToMessageObject", message);
    await this.router.navigate(["/basic-report/"], {
      queryParams: {
        report: message.type,
        id: message.id,
      },
    });
    this.showSidenav = false;
  }
}
