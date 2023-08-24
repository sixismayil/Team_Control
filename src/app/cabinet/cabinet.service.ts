import { DatePipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Routes, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CabinetComponent } from './cabinet.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import { AppConfig } from 'src/app.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CabinetService {
  e(id: any): void | Observable<any> {
    throw new Error('Method not implemented.');
  }
  myAppUrl: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  addEmployee(model: any): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api"
    let url = this.myAppUrl + '/employee/create-employee';
    return this.http.post<any>(url, model);
  }

  getEmployee(id: number): Observable<any> {
    console.log(id);
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/employee/get-employee?id=' + id;
    return this.http.get<any>(url);
  }


  updateEmployee(model: any, id: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api"
    let url = this.myAppUrl + '/employee/update-employee?id=' + id;
    return this.http.post<any>(url, model);
  }

  deleteEmployee(id: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api"
    let url = this.myAppUrl + '/employee/delete-employee?id=' + id;
    return this.http.delete<any>(url);
  }

  getEmployees(model: any, limit: number, skip: number, isExport: boolean): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api"
    let url = this.myAppUrl + `/employee/get-employees?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.post<any>(url, model);
  }

  getProjectStatusEmployee(): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api"
    let url = this.myAppUrl + '/lookup/project-status';
    return this.http.get<any>(url);
  }

  getProjectsEmployee(): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api"
    let url = this.myAppUrl + '/lookup/projects';
    return this.http.get<any>(url);
  }

  getPositionsEmployee(): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api"
    let url = this.myAppUrl + '/lookup/positions';
    return this.http.get<any>(url);
  }

  getPositions(limit: number, skip: number, isExport: boolean): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + `/position/get-positions?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.get<any>(url);
  }

  getPosition(id: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + `/Position/get-position?id=${id}`;
    return this.http.get<any>(url);
  }


  getVacationReasons(
    limit: number,
    skip: number,
    isExport: boolean
  ): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url =
      this.myAppUrl +
      `/VacationReason/get-vacation-reasons?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.get<any>(url);
  }

  getVacationReason(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + `/VacationReason/get-vacation-reason?id=${id}`;
    return this.http.get<any>(url);
  }


  getProjectStatuses(
    limit: number,
    skip: number,
    isExport: boolean
  ): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url =
      this.myAppUrl +
      `/ProjectStatus/get-project-statuses?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.get<any>(url);
  }

  getProjectStatus(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + `/ProjectStatus/get-project-status?id=${id}`;
    return this.http.get<any>(url);
  }

  addCustomer(model: any): Observable<any> {
    //this.myAppUrl = AppConfig.settings.other.resourceApiURI;
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/customer/create-customer';
    return this.http.post<any>(url, model);
  }

  addPosition(model: any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Position/create-position';
    return this.http.post<any>(url, model);
  }

  addVacationReason(model: any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/VacationReason/create-vacation-reason';
    return this.http.post<any>(url, model);
  }

  addProjectStatus(model: any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/ProjectStatus/create-project-status';
    return this.http.post<any>(url, model);
  }

  addProject(model: any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Project/create-project';
    return this.http.post<any>(url, model);
  }

  getCustomer(id: number): Observable<any> {
    //this.myAppUrl = AppConfig.settings.other.resourceApiURI;
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/customer/get-customer?id=' + id;
    return this.http.get<any>(url);
  }

  updateCustomer(model: any, id: number): Observable<any> {
    //this.myAppUrl = AppConfig.settings.other.resourceApiURI;
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/customer/update-customer?id=' + id;
    return this.http.post<any>(url, model);
  }

  updatePosition(model: any, id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Position/update-position?id=' + id;
    return this.http.post<any>(url, model);
  }

  updateVacationReason(model: any, id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/VacationReason/update-vacation-reason?id=' + id;
    return this.http.post<any>(url, model);
  }

  updateProjectStatus(model: any, id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/ProjectStatus/update-project-status?id=' + id;
    return this.http.post<any>(url, model);
  }

  updateProject(model: any, id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Project/update-project?id=' + id;
    return this.http.post<any>(url, model);
  }

  deleteCustomer(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/customer/delete-customer?id=' + id;
    return this.http.delete<any>(url);
  }

  deletePosition(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Position/delete-position?id=' + id;
    return this.http.delete<any>(url);
  }

  deleteVacationReason(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/VacationReason/delete-vacation-reason?id=' + id;
    return this.http.delete<any>(url);
  }

  deleteProjectStatus(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/ProjectStatus/delete-project-status?id=' + id;
    return this.http.delete<any>(url);
  }

  deleteProject(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Project/delete-project?id=' + id;
    return this.http.delete<any>(url);
  }

  getProjectStatusCustomer(): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/lookup/project-status';
    return this.http.get<any>(url);
  }

  getProjectsCustomer(): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/lookup/projects';
    return this.http.get<any>(url);
  }

  getCustomers(
    model: any,
    limit: number,
    skip: number,
    isExport: boolean
  ): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url =
      this.myAppUrl +
      `/customer/get-customers?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.post<any>(url, model);
  }

  getTeamLeaders(): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Project/get-teamleaders';
    return this.http.get<any>(url);
  }

  getEmployeesLookup(): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Lookup/employees';
    return this.http.get<any>(url);
  }

  getCustomersLookup(): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Lookup/customers";
    return this.http.get<any>(url);
  }



  getProject(id: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Project/get-project?id=" + id;
    return this.http.get<any>(url);
  }

  getProjects(
    model: any,
    limit: number,
    skip: number,
    isExport: boolean
  ): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url =
      this.myAppUrl +
      `/Project/get-projects?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.post<any>(url, model);
  }

  addPeopleToProject(model: any, projectId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Project/add-people-to-project?projectId=" + projectId;
    return this.http.post<any>(url, model);
  }

  getProjectParticipants(projectId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Project/get-project-participants?projectId=" + projectId;
    return this.http.get<any>(url);
  }

  updatePeopleInProjects(model: any, projectId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Project/update-people-in-projects?projectId=" + projectId;
    return this.http.post<any>(url, model);
  }

  getLatestNProjects(count: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Home/get-projects?count=" + count;
    return this.http.get<any>(url);
  }

  getStatistics(): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Home/get-statistics";
    return this.http.get<any>(url);
  }

  getLatestNVacations(count: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Home/get-vacations?count=" + count;
    return this.http.get<any>(url);
  }

  getProjectDetails(projectId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Project/get-general-info?projectId=" + projectId;
    return this.http.get<any>(url);
  }

  getProjectCustomers(projectId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Project/get-project-customers?projectId=" + projectId;
    return this.http.get<any>(url);
  }

  getProjectEmployee(projectId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Project/get-project-employees?projectId=" + projectId;
    return this.http.get<any>(url);
  }

  getProjectsParticipated(customerId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Customer/get-projects-participated?customerId=" + customerId;
    return this.http.get<any>(url);
  }

  getProjectsDetailed(customerId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Customer/get-projects-detailed?customerId=" + customerId;
    return this.http.get<any>(url);
  }

  getProjectsEmployeeParticipated(employeeId:number):Observable<any>{
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Employee/get-projects-employee-participated?employeeId="+employeeId;
    return this.http.get<any>(url);
  }

  public messageDialog(text: string, isRefresh: boolean) {
    this.dialog.open(MessageDialogComponent, {
      width: '500px',
      position: {
        top: '10px',
      },
      data: { Text: `${text}`, isRefresh: isRefresh },
      autoFocus: false,
    });
  }

  GetVacationReasons(): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/lookup/vacation-reasons';
    return this.http.get<any>(url);
  }

  addVacation(model: any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Vacation/create-vacation';
    return this.http.post<any>(url, model);
  }

  getVacations(
    model: any,
    limit: number,
    skip: number,
    isExport: boolean
  ): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url =
      this.myAppUrl +
      `/Vacation/get-vacations?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.post<any>(url, model);
  }
  getVacation(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Vacation/get-vacation?id=' + id;
    return this.http.get<any>(url);
  }
  updateVacation(model: any, id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Vacation/update-vacation?id=' + id;
    return this.http.post<any>(url, model);
  }
  deleteVacation(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Vacation/delete-vacation?id=' + id;
    return this.http.delete<any>(url);
  }

  getSalaries(
    model: any,
    limit: number,
    skip: number,
    isExport: boolean
  ): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url =
      this.myAppUrl +
      `/Salary/get-salaries?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.post<any>(url, model);
  }

  addSalary(model: any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Salary/create-salary';
    return this.http.post<any>(url, model);
  }

  getSalary(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Salary/get-salary?id=' + id;
    return this.http.get<any>(url);
  }
  updateSalary(model: any, id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Salary/update-salary?id=' + id;
    return this.http.post<any>(url, model);
  }

  deleteSalary(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Salary/delete-salary?id=' + id;
    return this.http.delete<any>(url);
  }

  GetSalaryByEmployee(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Salary/get-salary-employee?id=' + id;
    return this.http.get<any>(url);
  }
  getSalariesDetailed(employeeId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Employee/get-salaries-detailed?employeeId=" + employeeId;
    return this.http.get<any>(url);
  }

  getBonusesDetailed(employeeId: number): Observable<any> {
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Employee/get-bonuses-detailed?employeeId=" + employeeId;
    return this.http.get<any>(url);
  }

  getPremiumsDetailed(employeeId:number): Observable<any>{
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Employee/get-premiums-detailed?employeeId=" + employeeId;
    return this.http.get<any>(url);
  }

  getVacationsDetailed(employeeId:number): Observable<any>{
    this.myAppUrl = "http://localhost:16307/api";
    let url = this.myAppUrl + "/Employee/get-vacations-detailed?employeeId=" + employeeId;
    return this.http.get<any>(url);
  }

  addBonusAndPrize(model: any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/BonusAndPrize/create-bonus-and-prize';
    return this.http.post<any>(url, model);
  }

  getBonusAndPrize(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/BonusAndPrize/get-bonus-and-prize?id=' + id;
    return this.http.get<any>(url);
  }
  updateBonusAndPrize(model: any, id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/BonusAndPrize/update-bonus-and-prize?id=' + id;
    return this.http.post<any>(url, model);
  }

  resetPassword(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Employee/reset-password?id=' + id;
    return this.http.get<any>(url);
  }

  getBonusesAndPrizes(
    model: any,
    limit: number,
    skip: number,
    isExport: boolean
  ): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url =
      this.myAppUrl +
      `/BonusAndPrize/get-bonuses-and-prizes?limit=${limit}&skip=${skip}&isExport=${isExport}`;
    return this.http.post<any>(url, model);
  }

  deleteBonusAndPrize(id: number): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/BonusAndPrize/delete-bonus-and-prize?id=' + id;
    return this.http.delete<any>(url);
  }

  getProjectActiveStatus(projectId:number):Observable<any>{
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Project/get-active-status?id=' + projectId;
    return this.http.get<any>(url);
  }

  changePassword(model:any): Observable<any>{
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + `/Employee/change-password`;
    return this.http.post<any>(url,model);
  }

  getProfileData():Observable<any>{
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + '/Profile/get-data';
    return this.http.get<any>(url);
  }

  updateProfileData(model:any):Observable<any>{
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + `/Profile/update-data`;
    return this.http.post<any>(url,model);
  }

  changeFormatDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'dd.MM.yyyy')

  }

  changeFormatDateV2(date: string | number | Date) {
    return this.datePipe.transform(date, 'dd.MM.yyyy')
  }

  changeFormatDateV3(date: string | number | Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd')
  }

  changeFormatDateV4(date: string | number | Date){
    return this.datePipe.transform(date, 'dd.MM.yyyy')
  }

  changeFormatDateV5(date: string | number | Date){
    return this.datePipe.transform(date, 'dd.MM.yyyy | dd.MM.yyyy')
  }

  normalLogin(obj:any): Observable<any> {
    this.myAppUrl = 'http://localhost:16307/api';
    let url = this.myAppUrl + "/auth/normal-login";
    return this.http.post<any>(url, obj);
  }

  createJWT(token: any, returnToUrl: any) {
    localStorage.setItem("token", token.token);
    localStorage.setItem("tokenExpiration", token.expiresAt);
    if (returnToUrl) {
      this.router.navigate([returnToUrl]);
    }
  }

  clearStorage() {
    if (!localStorage.getItem('token') || this.getDecodedAccessToken(localStorage.getItem('token') || "") == null) {
      this.router.navigate(['/login']);
    } else if (this.getUserRole().toLowerCase() == 'false' &&
    (this.router.url != '/change-password' && this.router.url != '/profile')){
      this.router.navigate(['/employee-detail'], {queryParams:{id:this.getUserId()}})
    }
    var hours = AppConfig.settings.other.clearStorageHour;
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
      localStorage.setItem('setupTime', now.toString());
    } else {
      if (now - parseInt(setupTime) > hours * 60 * 60 * 1000) {
        localStorage.clear();
        window.location.reload();
        localStorage.setItem('setupTime', now.toString());
      }
    }

    // if (!localStorage.getItem("token")) {
    //   this.router.navigate(["/login"]);
    // }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      console.log(Error)
      return null;
    }
  }

  getUserName() {
    if (localStorage.getItem("token")) {
      const helper = new JwtHelperService();
      var a = localStorage.getItem('token') || undefined;
      const decodedToken = helper.decodeToken(a);
      if (decodedToken && decodedToken["UserName"]) {
        return { username: decodedToken["UserName"], errorCode: 0 };
      } else {
        return { username: null, errorCode: 1 };
      }
    } else {
      return { username: null, errorCode: 1 };
    }
  }

  getUserId() {
    if (localStorage.getItem("token")) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem('token') || undefined);
      return decodedToken["UserId"]
    }
  }

  getUserRole() {
    if (localStorage.getItem("token")) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem('token') || undefined);
      return decodedToken["UserRole"]
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: CabinetComponent,
      children: routes,
      data: { reuse: true },
    };
  }
}
