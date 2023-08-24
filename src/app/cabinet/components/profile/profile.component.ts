import { Component, Inject, OnInit } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  showSpinner = true;

  constructor(public cabinetService: CabinetService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{9}"), Validators.maxLength(9)]],
      relativesPhoneNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{9}"), Validators.maxLength(9)]],
      address: ['',],
      biography: [''],
      birthdate: ['', Validators.required]
    })

    this.get_data();

  }

  ngOnInit(): void {
  }

  update_profile() {
    if (this.profileForm.invalid) {
      this.profileForm.get("name")?.markAsTouched();
      this.profileForm.get("surname")?.markAsTouched();
      this.profileForm.get("email")?.markAsTouched();
      this.profileForm.get("phoneNumber")?.markAsTouched();
      this.profileForm.get("relativesPhoneNumber")?.markAsTouched();
      this.profileForm.get("birthdate")?.markAsTouched();
      return;
    } else {
      // console.log(this.cabinetService.changeFormatDateV3(this.profileForm.controls.birthdate.value));
      this.showSpinner = true;
      this.profileForm.value.birthdate = this.cabinetService.changeFormatDateV3(this.profileForm.controls.birthdate.value);
      this.cabinetService.updateProfileData(this.profileForm.value).subscribe(data => {
        if (data.status.errCode && data.status.errCode == 1) {
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

  get_data() {
    this.showSpinner = true;
    this.cabinetService.getProfileData().subscribe(data => {
      if (data.status.errCode && data.status.errCode == 1) {
        this.cabinetService.messageDialog(data.response, false);
        this.showSpinner = false;
      }
      else {
        this.profileForm = this.fb.group({
          name: [data.response.name, Validators.required],
          surname: [data.response.surname, Validators.required],
          email: [data.response.email, [Validators.required, Validators.email]],
          phoneNumber: [data.response.phoneNumber, [Validators.required, Validators.pattern("[0-9 ]{9}"), Validators.maxLength(9)]],
          relativesPhoneNumber: [data.response.relativesPhoneNumber, [Validators.required, Validators.pattern("[0-9 ]{9}"), Validators.maxLength(9)]],
          address: [data.response.address],
          biography: [data.response.biography],
          birthdate: [this.cabinetService.changeFormatDateV3(data.response.birthdate.split(' ')[0]), Validators.required]
        });
      }
      this.showSpinner = false;
    })
  }
}
