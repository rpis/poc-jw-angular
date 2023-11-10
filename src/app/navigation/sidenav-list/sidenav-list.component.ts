import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ConfigService } from "src/app/core/config.service";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  menuConfig = [];
  constructor(private configService: ConfigService) {
    this.menuConfig = this.configService.getMenuConfig();
  } //private userService: UserService //private kc: KeycloakService,

  isAuth: boolean = true;
  isUserActive: boolean = true;
  isAdminOrLeader: boolean = false;

  ngOnInit(): void {
    //his.isAuth = this.kc.isAuthenticated()
    //const user = this.userService.getCurrentUser()
    //this.isUserActive = user?.status === 'ACTIVE'
    //this.isAdminOrLeader = user?.admin || user?.leader
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    //this.kc.logout()
  }
}
