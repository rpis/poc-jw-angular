import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  config: any[any] = [];
  storeUrl: string = null;

  constructor(private httpClient: HttpClient) {}

  async readPageConfig(fileName) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>("./assets/" + fileName).subscribe((r) => {
        console.log("page response=" + JSON.stringify(r));
        this.config.push(r);
        resolve("");
      });
    });
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>("./assets/config.json")
        .subscribe(async (response) => {
          this.storeUrl = response.storeUrl;
          for (var page of response.page_configs) {
            console.log("page:" + page);
            await this.readPageConfig(page);
          }
          resolve("");
        });

      /*.pipe(
        tap((response: any) => {
          this.storeUrl = response.storeUrl;
          console.log("storeUrl = " + this.storeUrl);
          resolve(true);
          /*for (var page of response.page_configs) {
            console.log("page:" + page);

            this.httpClient.get("./assets/" + page).pipe(
              tap((r: any) => {
                console.log("r=" + r);
                this.config.push(r);
              })
            );
          }
        })
      );*/

      //.then()
    });
  }

  getMenuConfig(): any[] {
    var menuConfig = [];
    for (const page of this.config) {
      console.log(page.menuName);
      menuConfig.push({
        menuName: page.menuName,
        raportName: page.raportName,
        pageName: page.pageName,
      });
    }
    return menuConfig;
  }

  getSelectionForPage(pageName: string) {
    var selection = null;
    for (const page of this.config) {
      console.log("getSelectionForPage raportName:" + page.raportName);
      if (page.raportName == pageName) {
        selection = page.selection;
        break;
      }
    }
    console.log("getSelectionForPage:" + selection);
    return selection;
  }

  getListForPage(pageName: string) {
    var list = null;
    for (const page of this.config) {
      if (page.raportName == pageName) {
        list = page.list;
        break;
      }
    }
    console.log("getListForPage:" + list);
    return list;
  }

  getReportNameForPage(pageName: string) {
    var reportName = null;
    for (const page of this.config) {
      if (page.raportName == pageName) {
        reportName = page.raportName;
        break;
      }
    }
    console.log("getReportNameForPage:" + reportName);
    return reportName;
  }
}
