import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicListComponent } from "../components/dynamic-list/dynamic-list.component";
import { ConfigService } from "../core/config.service";
import { StoreService } from "../core/store.service";
import { ActivatedRoute } from "@angular/router";
import { DynamicFormComponent } from "../components/dynamic-form/dynamic-form.component";
import { Model } from "../model/model";

var test: Model[] = [
  {
    userid: "AKC000485",
    moddate: "1699436998000000000",
    modkey1: "1",
    modkey2: "",
    modkey3: "DV31c86eUt",
    keytype: "12",
    imp: "a co to???",
    oldval: "chLgwuAvBv3kNMw",
    newval: "lwOJ0IZF5pyzw5Z",
    modtype: "I",
    filename: "TMP",
    fldname: "Md0IyARHIz",
  },
];

@Component({
  selector: "app-basic-report",
  templateUrl: "./basic-report.component.html",
  styleUrls: ["./basic-report.component.css"],
})
export class BasicReportComponent {
  @ViewChild(DynamicListComponent) childList: DynamicListComponent;
  @ViewChild(DynamicFormComponent) childForm: DynamicFormComponent;

  public dynamicFormGroup: FormGroup;
  selectModel = {};
  listModel = {};
  reportName = "";
  showList = false;
  isLoading = false;
  isValid = false;
  searchVisible = true;
  constructor(
    private config: ConfigService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute
  ) {
    console.log("config =" + config.config);
    this.selectModel = []; //config.config[0].selection;
    this.listModel = []; //config.config[0].list;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (val) => {
      console.log("query:" + val["report"]);
      if (val["id"] == undefined) {
        this.selectModel = this.config.getSelectionForPage(val["report"]);
        this.listModel = this.config.getListForPage(val["report"]);
        this.reportName = this.config.getReportNameForPage(val["report"]);
        this.searchVisible = true;
        console.log(JSON.stringify(this.selectModel));
        console.log(JSON.stringify(this.listModel));
        if (this.childForm != null) {
          this.childForm.setModel(this.selectModel);
          this.childForm.buildForm();
        }
        if (this.childList != null) {
          this.childList.hideTable();
          this.childList.setModel(this.listModel);
        }
      } else {
        console.log("id:" + val["id"]);
        this.searchVisible = false;
        this.isLoading = true;
        var history: any = await this.store.getHistoryData(val["id"]);
        this.isLoading = false;
        this.selectModel = this.config.getSelectionForPage(val["report"]);
        // ustawienie wartosci z response
        var map: any = new Map(history.criteria);
        console.log("map" + map);

        Object.keys(this.selectModel).map((model) => {
          if (map.get(model) != undefined) {
            console.log("key model: " + model);
            console.log("key value: " + map.get(model).value);
            this.selectModel[model].value = map.get(model).value;
          }
        });
        this.listModel = this.config.getListForPage(val["report"]);
        this.reportName = this.config.getReportNameForPage(val["report"]);
        console.log(JSON.stringify(this.selectModel));
        console.log(JSON.stringify(this.listModel));
        if (this.childForm != null) {
          this.childForm.setModel(this.selectModel);
          this.childForm.buildForm();
        }
        if (this.childList != null) {
          this.childList.hideTable();
          this.childList.setModel(this.listModel);
          this.childList.search(history.response);
        }
      }
    });
  }
  ngDoCheck2() {
    this.activatedRoute.queryParams.subscribe(async (val) => {
      console.log("query:" + val["report"]);
      if (val["id"] == undefined) {
        this.selectModel = this.config.getSelectionForPage(val["report"]);
        this.listModel = this.config.getListForPage(val["report"]);
        this.reportName = this.config.getReportNameForPage(val["report"]);
        this.searchVisible = true;
        console.log(JSON.stringify(this.selectModel));
        console.log(JSON.stringify(this.listModel));
        if (this.childForm != null) {
          this.childForm.setModel(this.selectModel);
          this.childForm.buildForm();
        }
        if (this.childList != null) {
          this.childList.hideTable();
          this.childList.setModel(this.listModel);
        }
      } else {
        console.log("id:" + val["id"]);
        this.searchVisible = false;
        this.isLoading = true;
        var history: any = await this.store.getHistoryData(val["id"]);
        this.isLoading = false;
        this.selectModel = this.config.getSelectionForPage(val["report"]);
        // ustawienie wartosci z response
        var map: any = new Map(history.criteria);
        console.log("map" + map);

        Object.keys(this.selectModel).map((model) => {
          if (map.get(model) != undefined) {
            console.log("key model: " + model);
            console.log("key value: " + map.get(model).value);
            this.selectModel[model].value = map.get(model).value;
          }
        });
        this.listModel = this.config.getListForPage(val["report"]);
        this.reportName = this.config.getReportNameForPage(val["report"]);
        console.log(JSON.stringify(this.selectModel));
        console.log(JSON.stringify(this.listModel));
        if (this.childForm != null) {
          this.childForm.setModel(this.selectModel);
          this.childForm.buildForm();
        }
        if (this.childList != null) {
          this.childList.hideTable();
          this.childList.setModel(this.listModel);
          this.childList.search(history.response);
        }
      }
    });
  }

  setDynamicFormGroup(formGroup: FormGroup) {
    this.dynamicFormGroup = formGroup;
    console.log("Forem setted!");
    /*this.dynamicFormGroup.get("firstname").valueChanges.subscribe((k) => {
      console.log("change:" + k);
    });

    this.dynamicFormGroup.statusChanges.subscribe((k) => {
      console.log("status:" + k);
    });*/
    this.dynamicFormGroup.statusChanges.subscribe((k) => {
      console.log("status:" + k);
      if (k == "VALID") this.isValid = true;
      else this.isValid = false;
    });
  }

  async search() {
    var criteria = new Map();

    Object.keys(this.selectModel).forEach((k) => {
      const fieldProps = this.selectModel[k];
      //onsole.log(k + ":" + this.dynamicFormGroup.get(k).value);
      if (fieldProps.type == "date") {
        console.log(k + ":" + this.dynamicFormGroup.get(k).value);
        var date: Date = new Date(
          Date.parse(this.dynamicFormGroup.get(k).value)
        );
        console.log("parsedDare:" + date);
        criteria.set(k, {
          value: isNaN(date.getTime()) == false ? date.toISOString() : "",
        });
      } else
        criteria.set(k, {
          value: this.dynamicFormGroup.get(k).value,
        });
    });
    console.log("crit in" + JSON.stringify(Array.from(criteria.entries())));
    this.isLoading = true;
    try {
      var s = await this.store.getData(criteria, this.reportName);
      this.isLoading = false;
    } catch (Error) {
      console.log("Error"!);
      this.isLoading = false;
    }

    this.childList.search(s);
    this.showList = true;
  }
}
