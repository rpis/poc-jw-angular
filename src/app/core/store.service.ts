import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private configService: ConfigService, private http: HttpClient) {}

  async getData(criteria: any) {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(criteria));
      var criteriIn = Array.from(criteria.entries());
      this.http.post<any>(this.configService.storeUrl, criteriIn).subscribe(
        (result) => {
          console.log("result = " + result[0].userid);
          resolve(result);
        },
        (error) => {
          console.log("error = " + error);
          reject(error);
        }
      );
    });
  }
}
