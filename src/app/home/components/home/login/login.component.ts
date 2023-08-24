import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from 'src/app/cabinet/cabinet.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  showSpinner;
  constructor(private router: Router, private fb: FormBuilder, public cabinetService: CabinetService) {
    this.showSpinner=false;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    cabinetService.clearStorage();
  }

  ngOnInit(): void {}

  normalLogin(){
    if(this.loginForm.invalid){
      this.loginForm.get("email")?.markAsTouched();
      this.loginForm.get("password")?.markAsTouched();
      return;
    }
    this.showSpinner=true;
    this.cabinetService.normalLogin(this.loginForm.value).subscribe(data=>{

      if(data.errorCode && data.errorCode == 1){
        this.cabinetService.messageDialog(data.result, false);
      } else {
        this.cabinetService.createJWT(data.result,"cabinet");
      }
      this.showSpinner=false;
    },
    err=>{
      this.cabinetService.messageDialog('Serverdə xəta baş verdi',false);
    });
  }
}
