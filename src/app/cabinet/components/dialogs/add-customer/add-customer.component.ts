import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  label: string,
  id: any
}
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  data: any;
  label: string;
  id: any;
  customerForm: FormGroup;
  showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private fb: FormBuilder, public cabinetService: CabinetService, private dialog: MatDialog) {
    this.customerForm = this.fb.group({});
    this.data = data;
    this.label = data.label;
    this.id = data.id;

    if (this.label == "new") {
      this.customerForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        surname: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        position: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['+994', [Validators.pattern("^\.+[0-9]{12}$"), Validators.maxLength(13)]]
      });
    } else {
      this.get_customer(this.id);
    }
  }

  ngOnInit(): void {
  }

  get_customer(id: any) {
    this.showSpinner = true;
    this.cabinetService.getCustomer(id).subscribe(data => {
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      } else {
        this.customerForm = this.fb.group({
          name: [data.response.name,[Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
          surname: [data.response.surname, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
          position: [data.response.position],
          email: [data.response.email],
          phoneNumber: [data.response.phoneNumber, [Validators.pattern("^\.+[0-9]{12}$"), Validators.maxLength(13)]]
        });
      }
      this.showSpinner = false;
    },
      err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      });
  }

  add_customer() {
    if (this.customerForm.invalid) {
        this.customerForm.get("name")?.markAsTouched();
        this.customerForm.get("surname")?.markAsTouched();
        this.customerForm.get("email")?.markAsTouched();
        this.customerForm.get("phoneNumber")?.markAsTouched();
      return;
    }
    this.showSpinner = true;
    // if label new
    if (this.label == "new") {
      this.cabinetService.addCustomer(this.customerForm.value).subscribe(data => {
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
      this.cabinetService.updateCustomer(this.customerForm.value, this.id).subscribe(data => {
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
  //  get name(): AbstractControl { return this.customerForm.controls.name; }
  //  get surname(): AbstractControl { return this.customerForm.controls.surname; }
  //  get position(): AbstractControl { return this.customerForm.controls.position; }
  //  get email(): AbstractControl { return this.customerForm.controls.email; }
  //  get phoneNumber(): AbstractControl { return this.customerForm.controls.phoneNumber; }
}
