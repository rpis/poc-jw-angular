import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

import { DynamicFieldComponent } from "./components/dynamic-field/dynamic-field.component";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { DynamicInputComponent } from "./components/dynamic-field/dynamic-input/dynamic-input.component";
import { DynamicSelectComponent } from "./components/dynamic-field/dynamic-select/dynamic-select.component";
import { DynamicRadioComponent } from "./components/dynamic-field/dynamic-radio/dynamic-radio.component";
import { DynamicCheckboxsComponent } from "./components/dynamic-field/dynamic-checkboxs/dynamic-checkboxs.component";
import { DynamicErrorComponent } from "./components/dynamic-form/dynamic-error/dynamic-error.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DynamicListComponent } from "./components/dynamic-list/dynamic-list.component";
import { MatTableModule } from "@angular/material/table";
import { PreloadFactory } from "./core/preload.factory";
import { ConfigService } from "./core/config.service";
import { HttpClientModule } from "@angular/common/http";
import { StoreService } from "./core/store.service";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { ROUTES, RouterModule, provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app.routes";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { BasicReportComponent } from "./basic-report/basic-report.component";
import { StartPageComponent } from "./start-page/start-page.component";
import { MatDatepickerModule } from "@angular/material/datepicker";

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";

const MY_DATE_FORMAT = {
  parse: {
    dateInput: "DD.MM.YYYY", // this is how your date will be parsed from Input
  },
  display: {
    dateInput: "DD.MM.YYYY", // this is how your date will get displayed on the Input
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    FlexLayoutModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    DynamicFieldComponent,
    DynamicFormComponent,
    DynamicInputComponent,
    DynamicSelectComponent,
    DynamicRadioComponent,
    DynamicCheckboxsComponent,
    DynamicErrorComponent,
    DynamicListComponent,
    HeaderComponent,
    SidenavListComponent,
    BasicReportComponent,
    StartPageComponent,
  ],
  bootstrap: [AppComponent],

  providers: [
    provideRouter([]),
    StoreService,
    {
      provide: APP_INITIALIZER,
      useFactory: PreloadFactory,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: "pl-PL" },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class AppModule {}
