import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { BasicReportComponent } from "./basic-report/basic-report.component";
import { StartPageComponent } from "./start-page/start-page.component";

export const APP_ROUTES: Routes = [
  {
    path: "",
    component: StartPageComponent,
    pathMatch: "full",
  },

  {
    path: "basic-report",
    component: BasicReportComponent,
    pathMatch: "full",
  },
];
