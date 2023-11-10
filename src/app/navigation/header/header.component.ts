import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  notificationCounter$ = new Subject<number>();
  loginDisplay = "";

  isAuth: boolean = true;
  isUserActive: boolean = true;
  isAdminOrLeader: boolean = true;

  constructor() {} // private userService: UserService //private kc: KeycloakService,

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
    //this.kc.logout()
  }

  login() {}
  showMessages() {}
}
