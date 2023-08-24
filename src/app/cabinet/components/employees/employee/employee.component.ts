import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { AddEmployeeComponent } from '../../dialogs/add-employee/add-employee.component';
import { DeleteComponent } from '../../dialogs/delete/delete.component';

export interface Employee {
  id: number;
  fullname: string;
  projects: string[];
}

interface Status {
  id: number;
  name: string;
  key: string;
  color: string;
}

interface Project {
  id: number;
  name: string;
  teamLeaderId: number;
  statusId: number;
  teamLeader: null;
  status: null;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  statusArray: Status[] = [];
  projectsArray: Project[] = [];
  employeesArray: Employee[] = [];

  color = '#E91717';

  limit: any = 5;
  pageIndex: any = 0;
  skip: any = 0;

  filterForm: FormGroup = this.fb.group({
    fullname: null,
    projectStatusId: 0,
    projectId: 0,
  });

  displayedColumns: string[] = ['fullname', 'projects', 'actions'];
  dataSource = new MatTableDataSource<Employee>(this.employeesArray);
  showSpinner = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Employee>(this.employeesArray);
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    public cabinetService: CabinetService,
    private fb: FormBuilder
  ) {
    this.cabinetService.clearStorage();
    this.get_status();
    this.get_project();
    this.get_employees(this.filterForm.value, 5, 0, false);
  }

  filter_employees() {
    console.log(this.filterForm.value);
    this.showSpinner = true;
    this.get_employees(this.filterForm.value, this.limit, this.skip, false);
  }

  openDialog(label: string, id: any) {
    console.log(id);
    this.dialog.open(AddEmployeeComponent, {
      data: { label: `${label}`, id: id },
    });
  }

  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }
  
  delete_employee(id:number){
    this.openDeleteDialog("employee", id);
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event: any) {
    this.showSpinner = true;
    this.limit = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.get_employees(
      this.filterForm.value,
      event.pageSize,
      event.pageSize * event.pageIndex,
      false
    );
  }

  get_status() {
    this.cabinetService.getProjectStatusEmployee().subscribe((data) => {
      this.statusArray = data.result;
    });
  }

  get_project() {
    this.cabinetService.getProjectsEmployee().subscribe((data) => {
      this.projectsArray = data.result;
    });
  }


  resetPassword(id:number){
    this.openDeleteDialog("resetPassword", id);
  }

  get_employees(
    filterModel: any,
    limit: number,
    skip: number,
    isExport: boolean
  ) {
    this.employeesArray = [];
    this.cabinetService
      .getEmployees(
        {"fullname": filterModel.fullname, "projectId": filterModel.projectId, "projectStatusId": filterModel.projectStatusId},
        limit, skip, isExport
      )
      .subscribe((data) => {
        for (let element of data.response.data) {
          this.employeesArray.push({
            id: element.id,
            fullname: `${element.firstname} ${element.lastname}`,
            projects: element.projects.split(','),
          });
        }
        this.paginator.length = data.response.total;
        this.dataSource = new MatTableDataSource<Employee>(this.employeesArray);
        this.showSpinner = false;
      });
  }
}
