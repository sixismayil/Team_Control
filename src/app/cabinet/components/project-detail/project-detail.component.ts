import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../../cabinet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface Employee {
  name: string;
  position: string;
  isMain: string;
}
export interface Customer {
  id: number;
  fullname: string;
  role: string;
}

const EMPLOYEE_DATA: Employee[] = [];
const CUSTOMER_DATA: Customer[] = [];

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  id = 0;
  showSpinner = false;
  projectName = "";
  status = "?:::";
  teamLeader = "";
  color = '#E91717';
  projectIsActive=false;
  employeeData = new MatTableDataSource<Employee>(EMPLOYEE_DATA);
  customerData = new MatTableDataSource<Customer>(CUSTOMER_DATA);
  customerDataLength = 0;
  employeeDataLength = 0;
  employeeColumns: string[] = ['name', 'position', 'isMain'];
  customerColumns: string[] = ['fullname', 'role'];

  constructor(private route: ActivatedRoute, public cabinetService: CabinetService) {
    this.cabinetService.clearStorage();

    this.route.queryParams.subscribe(params => {
      this.get_project_active_status(+params.id)
        this.showSpinner = true;
        this.cabinetService.getProjectDetails(+params.id).subscribe(data => {
          this.id = data.response.id;
          this.projectName = data.response.name;
          this.status = data.response.status;
          this.teamLeader = data.response.teamLeader;
          this.showSpinner = false;
        });
        this.showSpinner = true;
        this.cabinetService.getProjectCustomers(+params.id).subscribe(data => {
        this.customerData = data.response.data;
        this.customerDataLength = data.response.data.length;
        this.showSpinner = false;
      });
      this.showSpinner = true;
      this.cabinetService.getProjectEmployee(+params.id).subscribe(data => {
        this.employeeData = data.response.data;
        this.employeeDataLength = data.response.data.length;
        this.showSpinner = false
      })
    })
  }

  get_project_active_status(projectId:number){
    this.showSpinner = true;

    this.cabinetService.getProjectActiveStatus(projectId).subscribe(data=>{
      this.showSpinner=false;
      this.projectIsActive = data.response;
    });
  }

  ngOnInit(): void {

  }
}
