import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Employee } from '../../employees/employee/employee.component';
import { DatePipe } from '@angular/common';

export interface DialogData {
  label: string;
  id: any;
}

interface VacationReasons {
  id: number;
  name: string;
  teamLeaderId: number;
  statusId: number;
}

@Component({
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.scss'],
})
export class AddVacationComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  data: any;
  label: string;
  id: any;
  vacationForm: FormGroup;
  showSpinner = false;
  employeeArray: Employee[] = [];
  VacationReasonsArray: VacationReasons[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private datePipe: DatePipe, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.vacationForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;
    this.get_employees();
    this.get_VacationReasons()

    if (this.label == "new") {
      this.vacationForm = this.fb.group({
        employeeId: ['', Validators.required],
        vacationReasonId: ['',Validators.required],
        startDate: ['',Validators.required],
        endDate: ['',Validators.required],
      });
    } else {
      this.get_vacations(this.id);
    }
  }


  showOverlay: boolean = false;
  showAddVacationModal: boolean = false;


  openNewVacationModal() {
    this.showOverlay = true;
    this.showAddVacationModal = true;
  }
  closeNewVacationModal() {
    this.showOverlay = false;
    this.showAddVacationModal = false;
  }


  add_vacation() {
    // console.log(JSON.stringify(this.vacationForm.value))
    console.log(this.vacationForm.value)
    if (this.vacationForm.invalid) {
      this.vacationForm.get("employeeId")?.markAsTouched();
      this.vacationForm.get("vacationReasonId")?.markAsTouched();
      this.vacationForm.get("startDate")?.markAsTouched();
      return;
    }
    this.showSpinner = true;
    if (this.label == "new") {
      this.vacationForm.value.startDate=this.cabinetService.changeFormatDateV3(this.vacationForm.controls.startDate.value)
      this.vacationForm.value.endDate=this.cabinetService.changeFormatDateV3(this.vacationForm.controls.endDate.value)

      this.cabinetService.addVacation(this.vacationForm.value).subscribe(data => {
        console.log(data);
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
      this.vacationForm.value.startDate=this.cabinetService.changeFormatDateV3(this.vacationForm.controls.startDate.value)
      this.vacationForm.value.endDate=this.cabinetService.changeFormatDateV3(this.vacationForm.controls.endDate.value)

      this.cabinetService.updateVacation(this.vacationForm.value, this.id).subscribe(data => {

        console.log(data);
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


  get_vacations(id:any){
    this.showSpinner = true;
    this.cabinetService.getVacation(id).subscribe(data=>{
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.vacationForm = this.fb.group({
          employeeId: [data.response.employeeId],
          vacationReasonId: [data.response.vacationReasonId],
          startDate: [this.datePipe.transform(data.response.startDate.split(" ")[0], 'yyyy-MM-dd'), Validators.required],
          endDate: [this.datePipe.transform(data.response.endDate.split(" ")[0], 'yyyy-MM-dd'), Validators.required],

          // startDate: [data.response.startDate],
          // endDate: [data.response.endDate]

        });
      }
      this.showSpinner = false;
    },
    err => {
      this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
      this.showSpinner = false;
    });
  }




  get_employees(){
    this.cabinetService.getEmployeesLookup().subscribe((data) => {
      this.employeeArray = data.result;
    });
  }

  get_VacationReasons(){
    this.cabinetService.GetVacationReasons().subscribe((data) => {
      this.VacationReasonsArray = data.result;
    });
  }


  ngOnInit(): void {}

}
