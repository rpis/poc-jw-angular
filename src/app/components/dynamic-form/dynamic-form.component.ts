import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
})
export class DynamicFormComponent implements OnInit {
  @Input() model: {};
  @Output() dynamicFormGroupEvent = new EventEmitter<FormGroup>();
  public dynamicFormGroup: FormGroup;
  public fields = [];

  ngOnInit() {
    this.buildForm();
  }

  getRows() {
    return ["1", "2", "3"];
  }

  getFieldsByRow(row: string) {
    var fields = [];
    for (const field of this.fields) {
      const fieldProps = this.model[field];
      if (field.row == row) fields.push(field);
    }
    return fields;
  }

  public setModel(model: any) {
    this.model = model;
  }
  public buildForm() {
    this.fields = [];
    const formGroupFields = this.getFormControlsFields();
    this.dynamicFormGroup = new FormGroup(formGroupFields);
    this.dynamicFormGroupEvent.emit(this.dynamicFormGroup);
  }

  private getFormControlsFields() {
    const formGroupFields = {};
    for (const field of Object.keys(this.model)) {
      const fieldProps = this.model[field];
      const validators = this.addValidator(fieldProps.rules);

      formGroupFields[field] = new FormControl(fieldProps.value, validators);
      this.fields.push({ ...fieldProps, fieldName: field });
    }

    return formGroupFields;
  }

  private addValidator(rules) {
    if (!rules) {
      return [];
    }

    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case "required":
          return Validators.required;
        case "number":
          return Validators.pattern(/[0-9]/);
        //add more case for future.
      }
    });
    return validators;
  }
}
