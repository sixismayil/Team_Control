import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CabinetComponent } from './cabinet.component';
import { SidebarComponent } from './fixed-part/sidebar/sidebar.component';
import { HeaderComponent } from './fixed-part/header/header.component';
import { FooterComponent } from './fixed-part/footer/footer.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { ProjectStatusesComponent } from './components/project-statuses/project-statuses.component';
import { VacationReasonsComponent } from './components/vacation-reasons/vacation-reasons.component';
import { PositionsComponent } from './components/positions/positions.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SalariesComponent } from './components/salaries/salaries.component';
import { BonusesAndPrizesComponent } from './components/bonuses-and-prizes/bonuses-and-prizes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddCustomerComponent } from './components/dialogs/add-customer/add-customer.component';
import { AddEmployeeComponent } from './components/dialogs/add-employee/add-employee.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import { CabinetService } from './cabinet.service';
import { AddPositionComponent } from './components/dialogs/add-position/add-position.component';
import { AddProjectStatusComponent } from './components/dialogs/add-project-status/add-project-status.component';
import { AddVacationReasonComponent } from './components/dialogs/add-vacation-reason/add-vacation-reason.component';
import { AddProjectComponent } from './components/dialogs/add-project/add-project.component';
import { AddVacationComponent } from './components/dialogs/add-vacation/add-vacation.component';
import { AddEmployeeToProjectComponent } from './components/dialogs/add-employee-to-project/add-employee-to-project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { DeleteComponent } from './components/dialogs/delete/delete.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AddSalaryComponent } from './components/dialogs/add-salary/add-salary.component';
import { AddBonusAndPrizeComponent } from './components/dialogs/add-bonus-and-prize/add-bonus-and-prize.component';

@NgModule({
  declarations: [
    CabinetComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    EmployeeComponent,
    CustomerComponent,
    ProjectStatusesComponent,
    VacationReasonsComponent,
    PositionsComponent,
    VacationsComponent,
    ProjectsComponent,
    SalariesComponent,
    BonusesAndPrizesComponent,
    AddCustomerComponent,
    AddEmployeeComponent,
    MessageDialogComponent,
    AddPositionComponent,
    AddProjectStatusComponent,
    AddVacationReasonComponent,
    AddProjectComponent,
    AddVacationComponent,
    AddEmployeeToProjectComponent,
    ProjectDetailComponent,
    CustomerDetailComponent,
    DeleteComponent,
    ChangePasswordComponent,
    ProfileComponent,
    EmployeeDetailComponent,
    EmployeeDetailComponent,
    AddSalaryComponent,
    AddBonusAndPrizeComponent
  ],
  entryComponents: [
    AddCustomerComponent,
    AddEmployeeComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [CabinetService, DatePipe]
})
export class CabinetModule {}
