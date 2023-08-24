import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

export interface DialogData {
  label: string,
  id: any
}

interface Positions {
  id: number,
  name: string,
  key: string,
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  positionsArray: Positions[] = [];
  get_positions(){
    this.cabinetService.getPositionsEmployee().subscribe(data=>{
      this.positionsArray = data.result;
    })
    }

    toppings = new FormControl();

    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  data: any;
  label: string;
  id: any;
  employeeForm: FormGroup;
  showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private datePipe: DatePipe, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.employeeForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;
    this.get_positions();

    if (this.label == "new") {
      this.employeeForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        position: [''],
        email: ['', Validators.email],
        phoneNumber: [null, [Validators.required, Validators.pattern("[0-9 ]{9}")]],
        relativesPhoneNumber: [null, [Validators.required, Validators.pattern("[0-9 ]{9}")]],
        address: [''],
        biography: [''],
        birthdate: ['', Validators.required],
        recruitmentDate: ['', Validators.required],
        salary: ['', Validators.required],
        isAdmin: ['0', Validators.required]
      });
    } else {
      this.get_employee(this.id);
      this.employeeForm = this.fb.group({
        // salary:  [{value:'',disabled: true} , Validators.required]
      });
    }
  }

  ngOnInit(): void {
  }

  showOverlay: boolean = false;
  showAddEmployeeModal: boolean = false;


  openNewEmployeeModal() {
    this.showOverlay = true;
    this.showAddEmployeeModal = true;
  }
  closeNewEmployeeModal() {
    this.showOverlay = false;
    this.showAddEmployeeModal = false;
  }

  get_employee(id: any) {
    this.showSpinner = true;
    this.cabinetService.getEmployee(id).subscribe(data => {
      console.log(data);
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;

      } else {
        console.log("test", this.datePipe.transform(data.response.birthdate.split(" ")[0], 'yyyy-MM-dd'))
        this.employeeForm = this.fb.group({
          name: [data.response.name, Validators.required],
          surname: [data.response.surname, Validators.required],
          position: [data.response.position],
          email: [data.response.email,  Validators.email],
          phoneNumber: [data.response.phoneNumber, [Validators.required, Validators.pattern("[0-9 ]{9}")]],
          relativesPhoneNumber: [data.response.relativesPhoneNumber, [Validators.required, Validators.pattern("[0-9 ]{9}")]],
          address: [data.response.address],
          biography: [data.response.biography],
          birthdate: [this.datePipe.transform(data.response.birthdate.split(" ")[0], 'yyyy-MM-dd'), Validators.required],
          recruitmentDate: [this.datePipe.transform(data.response.recruitmentDate.split(" ")[0], 'yyyy-MM-dd'), Validators.required],
          salary: [data.response.salary],
          isAdmin: [(data.response.isAdmin)?"1":"0", Validators.required]
        });

      }
      this.showSpinner = false;
    },
      err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      });
  }

  add_employee() {
    console.log(this.employeeForm.value)
    if (this.employeeForm.invalid) {
      this.employeeForm.get("name")?.markAsTouched();
      this.employeeForm.get("surname")?.markAsTouched();
      this.employeeForm.get("phoneNumber")?.markAsTouched();
      this.employeeForm.get("relativesPhoneNumber")?.markAsTouched();
      this.employeeForm.get("birthdate")?.markAsTouched();
      this.employeeForm.get("recruitmentDate")?.markAsTouched();
      this.employeeForm.get("salary")?.markAsTouched();
    return;
  }
    this.showSpinner = true;
    if (this.label == "new") {
      this.employeeForm.value.isAdmin = (this.employeeForm.controls.isAdmin.value=="1")?true:false;
      this.cabinetService.addEmployee(this.employeeForm.value).subscribe(data => {
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
    console.log(this.employeeForm.value);
    
    } else {
      console.log(this.employeeForm.value);
      this.employeeForm.value.isAdmin = (this.employeeForm.controls.isAdmin.value=="1")?true:false;
      this.cabinetService.updateEmployee(this.employeeForm.value, this.id).subscribe(data => {
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
}
