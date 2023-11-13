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
  public columns = [];

  showTable = false;

  displayedColumns = [];

  dataSource = new UserDataSource();

  constructor() {}

  private buildFields() {
    this.fields = [];
    this.columns = [];
    this.displayedColumns = [];
    console.log("setted model len:" + Object.keys(this.model).length);
    for (const field of Object.keys(this.model)) {
      const fieldProps = this.model[field];
      console.log({ ...fieldProps, fieldName: field });
      this.fields.push({ ...fieldProps, fieldName: field });
      this.columns.push(field);
      this.displayedColumns.push(field);
    }
    this.displayedColumns = this.displayedColumns.slice();
    this.fields = this.fields.slice();
  }

  public setModel(model) {
    this.model = model;
    this.buildFields();
  }

  public hideTable() {
    this.dataSource.observable.emit([]);
    this.showTable = false;
  }
  public search(criteria: any) {
    console.log("search ! " + criteria.length);
    this.showTable = true;
    this.buildFields();
    this.dataSource.observable.emit(criteria);
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

  constructor() {
    super();
  }
  connect(): Observable<Model[]> {
    return this.observable;
  }
  disconnect() {}
}
