import { DataSource } from "@angular/cdk/collections";
import { Component, EventEmitter, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Model } from "../../model/model";

@Component({
  selector: "app-dynamic-list",
  templateUrl: "./dynamic-list.component.html",
  styleUrls: ["./dynamic-list.component.css"],
})
export class DynamicListComponent {
  @Input() model: {};
  public fields = [];

  displayedColumns = [];

  dataSource = new UserDataSource(null, null);

  constructor() {}

  private buildFields() {
    //this.fields = [];
    //this.displayedColumns = [];
    console.log("setted model len:" + Object.keys(this.model).length);
    for (const field of Object.keys(this.model)) {
      const fieldProps = this.model[field];
      console.log({ ...fieldProps, fieldName: field });
      this.fields.push({ ...fieldProps, fieldName: field });
      this.displayedColumns.push(field);
    }
  }

  public setModel(model) {
    this.model = model;
    this.buildFields();
  }

  ngOnInit(): void {
    console.log("Model: " + this.model);
    this.buildFields();
    Object.keys(this.model).forEach((k) => {
      console.log(k);
      console.log(this.model[k]);
    });
    //this.displayedColumns = Object.keys(this.model);
    //this.dataSource.observable = new Observable((subscriber) => {
    //  console.log("Hello");
    //  subscriber.next([
    //    {
    //      userid: "1",
    //      modkey1: "ble",
    //    },
    //  ]);
    //});
  }

  public search(criteria: any) {
    console.log("search ! " + criteria.length);

    //Object.keys(this.model).forEach((k) => {
    //  console.log(k);
    //  console.log(this.model[k]);
    //});
    //this.displayedColumns = Object.keys(this.model);
    this.dataSource.observable.emit(criteria);

    //) = new Observable((subscriber) => {
    //  console.log("Hello");
    //  subscriber.next([]);
    //});
  }
  onSelectionChange(event: any) {
    console.log(event);
  }

  clicked(row: any) {
    console.log(row);
    /*var navModel: NavigationModel = {
      path: '/application/' + row.caseId,
      id: row.caseId,
    };
    this.sharedService.sharedRouter$.next(navModel);*/
    //this.router.navigate(["/application/" + row.caseId]);
  }
}

export class UserDataSource extends DataSource<any> {
  public observable: EventEmitter<Model[]> = new EventEmitter<Model[]>();

  constructor(private registryService: any, private cif: string) {
    console.log("registry cif : " + cif);
    super();
  }
  connect(): Observable<Model[]> {
    /*this.observable = new Observable((subscriber) => {
      console.log("Hello");
      subscriber.next([
        {
          userid: "1",
          modkey1: "testmod",
        },
      ]);
    });*/

    //Observable.apply(); //this.registryService.getRegistry(this.cif);
    return this.observable;
  }
  disconnect() {}
}
