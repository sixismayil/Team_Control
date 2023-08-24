import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddProjectComponent } from '../dialogs/add-project/add-project.component';
import { AddEmployeeToProjectComponent } from '../dialogs/add-employee-to-project/add-employee-to-project.component';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';

export interface PeriodicElement {
  name: string;
  status: number;
  in_charge: string
}

interface Project {
  id: number,
  name: string,
  status: string,
  teamLeader: string
}

interface Status {
  id: number,
  name: string,
  key: string,
  color: string
}

interface Worker {
  id: number,
  fullname: string
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectsArray: Project[] = [];
  projectsLookupArray: Project[] = [];
  statusArray: Status[] = [];
  teamLeadersArray: Worker[] = [];

  displayedColumns: string[] = ['name', 'status', 'teamLeader', 'actions'];
  dataSource = new MatTableDataSource<Project>(this.projectsArray);
  // showSpinner=true;
  showSpinner = true;
  color = '#E91717';
  limit: any = 5;
  pageIndex: any = 0;
  skip: any = 0;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  filterForm: FormGroup = this.fb.group({
    projectId: 0,
    projectStatusId: 0,
    teamLeaderId: 0
  });

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<Project>(this.projectsArray);
  }

  constructor(public dialog: MatDialog, public cabinetService: CabinetService, private fb: FormBuilder) {
    this.cabinetService.clearStorage();

      this.get_project();
      this.get_status();
      this.get_teamleaders();
      this.get_projects(this.filterForm.value, 5, 0, false);
  }

  get_project() {
    this.cabinetService.getProjectsCustomer().subscribe(data => {
      this.projectsLookupArray = data.result;
    })
  }

  get_status() {
    this.cabinetService.getProjectStatusCustomer().subscribe(data => {
      this.statusArray = data.result;
    })
  }

  get_teamleaders() {
    this.cabinetService.getTeamLeaders().subscribe(data => {
      this.teamLeadersArray = data.response.data;
    })
  }

  filter_projects() {
    this.showSpinner = true;
    this.get_projects(this.filterForm.value, this.limit, this.skip, false);
  }

  openDialog(label: string, id: any) {
    this.dialog.open(AddProjectComponent, {
      data: { label: `${label}`, id: id }
    });
  }

  openDeleteDialog(label: string, id: number) {
    this.dialog.open(DeleteComponent, {
      data: { label: `${label}`, id: id }
    });
  }

  get_projects(filterModel: any, limit: number, skip: number, isExport: boolean) {
    this.projectsArray = [];
    this.cabinetService.getProjects(
      {
        "projectId": filterModel.projectId,
        "projectStatusId": filterModel.projectStatusId,
        "teamLeaderId": filterModel.teamLeaderId
      },
      limit, skip, isExport
    ).subscribe(data => {
      for (let element of data.response.data) {
        this.projectsArray.push(
          {
            id: element.id,
            name: element.name,
            status: element.status,
            teamLeader: element.teamLeader
          })
      }
      this.paginator.length = data.response.total;
      this.dataSource = new MatTableDataSource<Project>(this.projectsArray);
      this.showSpinner = false;
    })
  }

  delete_project(id: number) {
    this.openDeleteDialog("project", id);
  }

  justAlert(event: any) {
    console.log(event);
  }

  pageChanged(event: any) {
    this.showSpinner = true;
    this.limit = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.get_projects(this.filterForm.value, event.pageSize, event.pageSize * event.pageIndex, false);
  }

  add_employee_to_project(label: string, id: number) {
    this.dialog.open(AddEmployeeToProjectComponent, {
      data: { label: `${label}`, id: id }
    });
  }
  go_to_details(projectId: number) {
    this.dialog.open(ProjectDetailComponent, {
      data: { id: projectId }
    });
  }

  ngOnInit(): void {
  }

}
