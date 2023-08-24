import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  label: string,
  id: any
}

@Component({
  selector: 'app-add-vacation-reason',
  templateUrl: './add-vacation-reason.component.html',
  styleUrls: ['./add-vacation-reason.component.scss']
})

export class AddVacationReasonComponent implements OnInit {
  data: any;
  label: string;
  id: any;
  vacationReasonForm: FormGroup;
  showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.vacationReasonForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;

    if (this.label == "new"){
      this.vacationReasonForm = this.fb.group({
        name: ['',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        key : ['',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
      });
    } else {
        this.get_vacation_reason(this.id);
    }
  }

  get_vacation_reason(id: any){
    this.showSpinner = true;
    this.cabinetService.getVacationReason(id).subscribe(data=>{
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.vacationReasonForm = this.fb.group({
          name: [data.response.name,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
          key: [data.response.key,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
        });
      }
      this.showSpinner = false;
    },
      err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      });
  }

  add_vacation_reason(){
    if (this.vacationReasonForm.invalid) {
      this.vacationReasonForm.get("name")?.markAsTouched();
      this.vacationReasonForm.get("key")?.markAsTouched();
      return;
    }
    this.showSpinner = true;
    if (this.label == "new") {
      this.vacationReasonForm.value.name = this.vacationReasonForm.controls.name.value.trim();
      this.vacationReasonForm.value.key = this.vacationReasonForm.controls.key.value.trim();
      this.cabinetService.addVacationReason(this.vacationReasonForm.value).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        } else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
        this.showSpinner = false;
      },
       err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      })
    } else {
      this.cabinetService.updateVacationReason(this.vacationReasonForm.value, this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        } else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
        this.showSpinner = false;
      },
      err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      })
    }
  }


  ngOnInit(): void {
  }

}
