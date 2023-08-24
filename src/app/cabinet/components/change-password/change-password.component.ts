import { Component, Inject, OnInit } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  showSpinner:boolean;
  hideCurrentPassword:boolean;
  hideNewPasswords:boolean;

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

  passwordForm:FormGroup = this.fb.group({
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required],
    currentPassword:['',Validators.required]
  },{ validators:this.passwordMatchingValidator });

  constructor(public cabinetService: CabinetService, private fb: FormBuilder) {
    this.showSpinner=false;
    this.hideCurrentPassword=true;
    this.hideNewPasswords=true;
  }

  ngOnInit(): void {
  }

  update_password(){
    if(this.passwordForm.invalid){
      this.passwordForm.get("password")?.markAsTouched();
      this.passwordForm.get("confirmPassword")?.markAsTouched();
      this.passwordForm.get("currentPassword")?.markAsTouched();
      return;
    } else {
      this.showSpinner = true;
      this.cabinetService.changePassword({password:this.passwordForm.value.password, currentPassword:this.passwordForm.value.currentPassword}).subscribe(data=>{
        if (data.status.errCode && data.status.errCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
          this.passwordForm.get("currentPassword")?.markAsTouched();
        } else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
        this.showSpinner = false;
      })
    }
  }
}
