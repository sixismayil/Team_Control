import { Component, Inject, OnInit } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  export interface DialogData {
    label: string,
    id: any
  }

interface Status {
  id: number,
  name: string,
  key: string,
  color: string
}

interface Worker{
  id:number,
  fullname: string
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  data: any;
  label: string;
  id: any;
  projectForm: FormGroup;
  showSpinner = false;
  statusArray: Status[] = [];
  employeeArray: Worker[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.projectForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;
    this.get_status();
    this.get_teamleaders();

    if (this.label == "new") {
        this.projectForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        statusId: ['', [Validators.required, Validators.min(1)]],
        teamLeaderId: ['', [Validators.required, Validators.min(1)]]
      });
    }else{
      this.get_project(this.id);
    }
   }

  add_project(){
    if (this.projectForm.invalid) {
      this.projectForm.get("name")?.markAsTouched();
      this.projectForm.get("statusId")?.markAsTouched();
      this.projectForm.get("teamLeaderId")?.markAsTouched();
      return;
    }
    this.showSpinner = true;
    if (this.label == "new") {
      this.projectForm.value.name = this.projectForm.controls.name.value.trim();
      this.cabinetService.addProject(this.projectForm.value).subscribe(data => {
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
        });
    } else {
      // else updateCustomer method (this.customerForm.value, id)
      this.cabinetService.updateProject(this.projectForm.value, this.id).subscribe(data => {
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
        });
    }
  }

  get_status(){
    this.cabinetService.getProjectStatusCustomer().subscribe(data=>{
      this.statusArray = data.result;
    })
  }

  get_teamleaders(){
    this.cabinetService.getEmployeesLookup().subscribe(data=>{
      this.employeeArray=data.result;
    })
  }

  get_project(id:any){
    this.showSpinner = true;
    this.cabinetService.getProject(id).subscribe(data=>{
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.projectForm = this.fb.group({
        name: [data.response.name, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        statusId: [data.response.statusId,[Validators.required, Validators.min(1)]],
        teamLeaderId: [data.response.teamLeaderId,[Validators.required, Validators.min(1)]]
        });
      }
      this.showSpinner = false;
    },
    err => {
      this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
      this.showSpinner = false;
    });
  }
  ngOnInit(): void {
  }

}
