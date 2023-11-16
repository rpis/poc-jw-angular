import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  async getData(criteria: any, type: string) {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(criteria));
      const buffer = {
        criteria: Array.from(criteria.entries()),
        type: type,
        userId: this.authService.user.localAccountId,
      };

      this.http.post<any>(this.configService.storeUrl, buffer).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          console.log("error = " + error);
          reject(error);
        }
      );
    });
  }

  async getHistoryData(id) {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(
          this.configService.storeUrl +
            "/history/" +
            this.authService.user.localAccountId +
            "/" +
            id
        )
        .subscribe(
          (result) => {
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
