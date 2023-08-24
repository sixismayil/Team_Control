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

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss']
})

export class AddSalaryComponent implements OnInit {
  data: any;
  label: string;
  id: any;
  salaryForm: FormGroup;
  showSpinner = false;
  employeeArray: Employee[] = [];
  currentSalary = 0;
  currentAmount = 0;


  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private datePipe: DatePipe, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.salaryForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;
    this.get_employees();

    if (this.label == "new") {
      this.salaryForm = this.fb.group({
        employeeId:  ['', [Validators.required, Validators.min(1)]],
        amount: ['',Validators.required],
        date: ['',Validators.required],
        totalsal: [{value: '', disabled: true}],
      });
    } else {
      this.get_salaries(this.id);
      this.salaryForm = this.fb.group({
        employeeId:  [{value:'',disabled: true} , Validators.required],
        amount: ['',Validators.required],
        date: ['',Validators.required],
        totalsal: [{value: "", disabled: true}]

      });
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
  
  add_salary() {
    console.log(this.salaryForm.value)
    if (this.salaryForm.invalid) {
      this.salaryForm.get("employeeId")?.markAsTouched();
      this.salaryForm.get("amount")?.markAsTouched();
      this.salaryForm.get("date")?.markAsTouched();
      return;
    }
    this.showSpinner = true;
    if (this.label == "new") {
      this.salaryForm.value.date=this.cabinetService.changeFormatDateV3(this.salaryForm.controls.date.value)     
      this.cabinetService.addSalary(this.salaryForm.value).subscribe(data => {
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
      this.salaryForm.value.date=this.cabinetService.changeFormatDateV3(this.salaryForm.controls.date.value)
      console.log(this.salaryForm.value);
      this.cabinetService.updateSalary(this.salaryForm.value, this.id).subscribe(data => {
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

  get_salaries(id:any){
    this.showSpinner = true;
    this.cabinetService.getSalary(id).subscribe(data=>{
      console.log(data);
      
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.currentSalary = data.response.salary;
        this.currentAmount = data.response.amount;
        this.salaryForm = this.fb.group({
          employeeId: [data.response.employeeId, Validators.required],
          amount: [data.response.amount, Validators.required],
          date: [this.datePipe.transform(data.response.date.split(" ")[0], 'yyyy-MM-dd'), Validators.required],
          totalsal: [{value: data.response.salary, disabled: true}]
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

  ngOnInit(): void {
  }

 showvalue(event:any){
   console.log(+event.target.value);
   this.salaryForm.controls['totalsal'].setValue(this.currentSalary+(+event.target.value)-this.currentAmount);

 }

getsalary(){
    this.cabinetService.GetSalaryByEmployee(this.salaryForm.value.employeeId).subscribe(data=>{
    this.currentSalary=data.response
    this.salaryForm.controls['totalsal'].setValue(data.response);      
        
  })
}

}
