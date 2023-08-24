import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './home/components/home/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { HomeModule } from './home/components/home/home.module';
import { CabinetModule } from './cabinet/cabinet.module';
import { DrawerRailModule } from 'angular-material-rail-drawer';
import { AddCustomerComponent } from './cabinet/components/dialogs/add-customer/add-customer.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CabinetService } from './cabinet/cabinet.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfig } from 'src/app.config';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DrawerRailModule,
    RouterModule,
    HomeModule,
    CabinetModule,
  ],
  providers: [CabinetService, AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig, HttpClientModule],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },],
  bootstrap: [AppComponent],
})
export class AppModule { }
