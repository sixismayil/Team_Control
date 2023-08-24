import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  label: string,
  id: any
}

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})

export class AddPositionComponent implements OnInit {
  data: any;
  label: string;
  id: any;
  positionForm: FormGroup;
  showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.positionForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;

    if (this.label == "new"){
      this.positionForm = this.fb.group({
        name: ['',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        key : ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
      });
    } else {
        this.get_position(this.id);
    }
   }

  get_position(id: any){
    this.showSpinner = true;
    this.cabinetService.getPosition(id).subscribe(data => {
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.positionForm = this.fb.group({
          name: [data.response.name, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
          key: [data.response.key, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
        });
      }
      this.showSpinner = false;
    },
      err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      });
  }

  add_position(){
    if (this.positionForm.invalid) {
      this.positionForm.get("name")?.markAsTouched();
      this.positionForm.get("key")?.markAsTouched();
      return;
    }
    this.showSpinner = true;
    if (this.label == "new") {
      this.positionForm.value.name = this.positionForm.controls.name.value.trim();
      this.positionForm.value.key = this.positionForm.controls.key.value.trim();
      this.cabinetService.addPosition(this.positionForm.value).subscribe(data=>{
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
      this.cabinetService.updatePosition(this.positionForm.value, this.id).subscribe(data=>{
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
