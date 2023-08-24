import { Component,Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  label: string,
  id: any
}

@Component({
  selector: 'app-add-project-status',
  templateUrl: './add-project-status.component.html',
  styleUrls: ['./add-project-status.component.scss']
})

export class AddProjectStatusComponent implements OnInit {
  data: any;
  label: string;
  id: any;
  projectStatusForm: FormGroup;
  showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.projectStatusForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;

    if (this.label == "new"){
      this.projectStatusForm = this.fb.group({
        name: ['',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        key : ['',[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        color: ['#000000',Validators.required]
      });
    } else {
        this.get_project_status(this.id);
    }
   }

  componentToHex(c:any ) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r:any, g:any, b:any) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }
  hexToRgb(hex:string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
    `${parseInt(result[1], 16)}:${parseInt(result[2], 16)}:${parseInt(result[3], 16)}` : null;
  }

   get_project_status(id: any){
    this.showSpinner = true;
    this.cabinetService.getProjectStatus(id).subscribe(data=>{
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.projectStatusForm = this.fb.group({
          name: [data.response.name,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
          key: [data.response.key,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
          color: [this.rgbToHex(+data.response.color.split(':')[0],+data.response.color.split(':')[1],+data.response.color.split(':')[2])]
        });
      }
      this.showSpinner = false;
    },
      err => {
      this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
      this.showSpinner = false;
    })
   }

   add_project_status(){
    if (this.projectStatusForm.invalid) {
      this.projectStatusForm.get("name")?.markAsTouched();
      this.projectStatusForm.get("key")?.markAsTouched();
      this.projectStatusForm.get("color")?.markAsTouched();
      return;
    }
    this.showSpinner = true;
    if(this.label=='new'){
      this.projectStatusForm.value.name = this.projectStatusForm.controls.name.value.trim();
      this.projectStatusForm.value.key = this.projectStatusForm.controls.key.value.trim();
      this.projectStatusForm.value.color=this.hexToRgb(this.projectStatusForm.value.color);
      this.cabinetService.addProjectStatus(this.projectStatusForm.value).subscribe(data=>{
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
      if(this.projectStatusForm.value.color.includes('#')){
        this.projectStatusForm.value.color=this.hexToRgb(this.projectStatusForm.value.color);
      }
      this.cabinetService.updateProjectStatus(this.projectStatusForm.value, this.id).subscribe(data=>{
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
      }
      )
    }
   }

  ngOnInit(): void {
  }

}
