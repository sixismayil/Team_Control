import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Employee } from '../../employees/employee/employee.component';
import { DatePipe } from '@angular/common';

export interface DialogData {
  label:string,
  id: number;
}

interface Project {
  id: number,
  name: string,
}

@Component({
  selector: 'app-add-bonus-and-prize',
  templateUrl: './add-bonus-and-prize.component.html',
  styleUrls: ['./add-bonus-and-prize.component.scss']
})
export class AddBonusAndPrizeComponent implements OnInit {
  data: any;
  label: string;
  id: any;
  bonusAndPrizeForm: FormGroup;
  showSpinner = false;
  employeeArray: Employee[] = [];
  projectsLookupArray: Project[] = [];


  // addPrizesForm: FormGroup = this.fb.group({
  //   prizesList: this.fb.array([])
  // });


  
  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private datePipe: DatePipe, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.bonusAndPrizeForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;
    this.get_employees();
    this.get_project();
    
    if (this.label == "new") {
      this.bonusAndPrizeForm = this.fb.group({
        isPrize: ['0', Validators.required],
        employeeId:  ['', [Validators.required, Validators.min(1)]],
        amount: ['',Validators.required],
        date: ['',Validators.required],
        projectId: [''],
        reason: [''],
      });
    } else {
      this.getBonusesAndPrizes(this.id);
      this.bonusAndPrizeForm = this.fb.group({
        isPrize: ['', Validators.required],
        employeeId:  ['', [Validators.required, Validators.min(1)]],
        amount: ['',Validators.required],
        date: ['',Validators.required],
        projectId: [''],
        reason: [''],
      });
    }
  }

  showOverlay: boolean = false;
  showAddBonusAndPrizeModal: boolean = false;



  openNewBonusAndPrizeModal() {
    this.showOverlay = true;
    this.showAddBonusAndPrizeModal = true;
  }
  closeNewBonusAndPrizeModal() {
    this.showOverlay = false;
    this.showAddBonusAndPrizeModal = false;
  }
  

  addBonusAndPrize() {
    if(this.bonusAndPrizeForm.controls.isPrize.value==0){
      this.bonusAndPrizeForm.controls['projectId'].setValidators([Validators.required])
      this.bonusAndPrizeForm.controls['reason'].clearValidators()
      this.bonusAndPrizeForm.controls['reason'].updateValueAndValidity()
      this.bonusAndPrizeForm.controls['projectId'].updateValueAndValidity()

    }else{
      this.bonusAndPrizeForm.controls['reason'].setValidators([Validators.required])
      this.bonusAndPrizeForm.controls['projectId'].clearValidators()
      this.bonusAndPrizeForm.controls['reason'].updateValueAndValidity()
      this.bonusAndPrizeForm.controls['projectId'].updateValueAndValidity()
    }
    if (this.bonusAndPrizeForm.invalid) {
      this.bonusAndPrizeForm.get("isPrize")?.markAsTouched();
      this.bonusAndPrizeForm.get("employeeId")?.markAsTouched();
      this.bonusAndPrizeForm.get("amount")?.markAsTouched();
      this.bonusAndPrizeForm.get("date")?.markAsTouched();
      this.bonusAndPrizeForm.get("projectId")?.markAsTouched();
      this.bonusAndPrizeForm.get("reason")?.markAsTouched();
      console.log(this.bonusAndPrizeForm.value);
      
      return;
    }
    this.showSpinner = true;
    if (this.label == "new") {
      this.bonusAndPrizeForm.value.date=this.cabinetService.changeFormatDateV3(this.bonusAndPrizeForm.controls.date.value)
      this.bonusAndPrizeForm.value.isPrize=+this.bonusAndPrizeForm.value.isPrize
      console.log(this.bonusAndPrizeForm.value);
      this.cabinetService.addBonusAndPrize(this.bonusAndPrizeForm.value).subscribe(data => {
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
      this.bonusAndPrizeForm.value.date=this.cabinetService.changeFormatDateV3(this.bonusAndPrizeForm.controls.date.value)
      console.log(this.bonusAndPrizeForm.value);

      this.cabinetService.updateBonusAndPrize(this.bonusAndPrizeForm.value, this.id).subscribe(data => {
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

  getBonusesAndPrizes(id:any){
    this.showSpinner = true;
    this.cabinetService.getBonusAndPrize(id).subscribe(data=>{
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.bonusAndPrizeForm = this.fb.group({
          isPrize: [`${data.response.isPrize}`, Validators.required],
          employeeId: [data.response.employeeId, Validators.required],
          amount: [data.response.amount, Validators.required],
          date: [this.datePipe.transform(data.response.date.split(" ")[0], 'yyyy-MM-dd'), Validators.required],
          projectId: [data.response.projectId, Validators.required],
          reason: [data.response.reason, Validators.required],
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


get_project() {
  this.cabinetService.getProjectsCustomer().subscribe(data => {
    this.projectsLookupArray = data.result;
  })
}

}
