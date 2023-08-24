import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { BonusesAndPrizesComponent } from 'src/app/cabinet/components/bonuses-and-prizes/bonuses-and-prizes.component';
import { CabinetHomeComponent } from 'src/app/cabinet/components/cabinet-home/cabinet-home.component';
import { ChangePasswordComponent } from 'src/app/cabinet/components/change-password/change-password.component';
import { CustomerDetailComponent } from 'src/app/cabinet/components/customer-detail/customer-detail.component';
import { CustomerComponent } from 'src/app/cabinet/components/customers/customer/customer.component';
import { EmployeeDetailComponent } from 'src/app/cabinet/components/employee-detail/employee-detail.component';
import { EmployeeComponent } from 'src/app/cabinet/components/employees/employee/employee.component';
import { PositionsComponent } from 'src/app/cabinet/components/positions/positions.component';
import { ProfileComponent } from 'src/app/cabinet/components/profile/profile.component';
import { ProjectDetailComponent } from 'src/app/cabinet/components/project-detail/project-detail.component';
import { ProjectStatusesComponent } from 'src/app/cabinet/components/project-statuses/project-statuses.component';
import { ProjectsComponent } from 'src/app/cabinet/components/projects/projects.component';
import { SalariesComponent } from 'src/app/cabinet/components/salaries/salaries.component';
import { VacationReasonsComponent } from 'src/app/cabinet/components/vacation-reasons/vacation-reasons.component';
import { VacationsComponent } from 'src/app/cabinet/components/vacations/vacations.component';

const routes: Routes = [
  CabinetService.childRoutes([
    { path: '', redirectTo: '/cabinet', pathMatch: 'full' },
    {
      path: 'cabinet',
      component: CabinetHomeComponent,
    },
    {
      path: 'employees',
      component: EmployeeComponent,
    },
    {
      path: 'customers',
      component: CustomerComponent,
    },
    {
      path:'project-statuses',
      component: ProjectStatusesComponent
    },
    {
      path:'vacation-reasons',
      component: VacationReasonsComponent
    },
    {
      path:'positions',
      component: PositionsComponent
    },
    {
      path:'vacations',
      component: VacationsComponent
    },
    {
      path:'projects',
      component: ProjectsComponent
    },
    {
      path:'project-detail',
      component: ProjectDetailComponent
    },{
      path:'customer-detail',
      component: CustomerDetailComponent
    },
    {
      path:'salaries',
      component: SalariesComponent
    },
    {
      path:'bonuses-and-prizes',
      component: BonusesAndPrizesComponent
    },
    {
      path:'change-password',
      component: ChangePasswordComponent
    },
    {
      path:'profile',
      component: ProfileComponent
    },
    {
      path:'employee-detail',
      component: EmployeeDetailComponent
    }
  ])
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

/*
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
*/
