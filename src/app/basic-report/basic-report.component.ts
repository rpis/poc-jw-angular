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
    this.activatedRoute.queryParams.subscribe((val) => {
      console.log("query:" + val["report"]);
      this.selectModel = this.config.getSelectionForPage(val["report"]);
      this.listModel = this.config.getListForPage(val["report"]);
      this.reportName = this.config.getReportNameForPage(val["report"]);
      console.log(JSON.stringify(this.selectModel));
      console.log(JSON.stringify(this.listModel));
      if (this.childForm != null) {
        this.childForm.setModel(this.selectModel);
        this.childForm.buildForm();
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

        criteria.set(k, {
          value: date.toISOString(),
        });
      } else
        criteria.set(k, {
          value: this.dynamicFormGroup.get(k).value,
        });
    });
    console.log("crit in" + JSON.stringify(Array.from(criteria.entries())));
    //var s = await this.store.getData(criteria);
    //console.log("s=" + s[0].userid);
    this.showList = true;
    this.childList.setModel(this.listModel);
    this.childList.search(test);
    this.showList = true;
  }
}
