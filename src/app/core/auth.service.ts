import { Inject, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from "@azure/msal-angular";
import {
  AccountInfo,
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
} from "@azure/msal-browser";
import { Subject, filter, takeUntil } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly _destroying$ = new Subject<void>();
  isAuthenticated = false;
  user: any;

  $authInfo: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private injector: Injector
  ) {
    this.msalService.instance.addEventCallback((event: EventMessage) => {
      console.log("addEventCallback");
      console.log(event);
    });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        console.log("inProgres");

        this.isAuthenticated =
          this.msalService.instance.getAllAccounts().length > 0;
        if (this.isAuthenticated) {
          this.user = this.msalService.instance.getAllAccounts()[0];
          console.log("send message auth");
          this.$authInfo.next(this.isAuthenticated);
        } else {
          this.login();
        }
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.SSO_SILENT_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        console.log("SET LOGIN" + result.payload);
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.HANDLE_REDIRECT_START
        )
      )
      .subscribe((result: EventMessage) => {
        console.log("Set InProgress true");
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.HANDLE_REDIRECT_END
        )
      )
      .subscribe((result: EventMessage) => {
        console.log("Set InProgress false");
      });
  }

  async login() {
    const router = this.injector.get(Router);
    console.log(router.getCurrentNavigation());
    console.log(router.url);
    router.routerState.root.queryParams.subscribe((params) => {
      console.log(params);
    });
    /*if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService
          .loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {*/
    //if (!this.inProgress)
    await this.msalService.loginRedirect({
      ...this.msalGuardConfig.authRequest,
    } as RedirectRequest);
    //.subscribe((k) => {
    //  console.log('k: ' + k);
    // }
    //);
    /*} else {
        this.authService.loginRedirect().subscribe((k) => {
          console.log('k: ' + k);
        });
      }
    }*/
  }

  logout() {
    this.msalService.logout();
  }

  get authenticated(): boolean {
    return this.msalService.instance.getActiveAccount() ? true : false;
  }

  get account(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }
}
