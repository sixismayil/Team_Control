import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CabinetService } from 'src/app/cabinet/cabinet.service';

export interface Project {
  id:0;
  name: string;
  teamLeader: string;
  status: string;
}

export interface Vacation{
  id:0;
  employee: string;
  vacationReason: string;
  startDate: string;
  endDate: string;
}

const PROJECT_DATA: Project[] = [];
const VACATION_DATA: Vacation[] = [];

@Component({
  selector: 'app-cabinet-home',
  templateUrl: './cabinet-home.component.html',
  styleUrls: ['./cabinet-home.component.scss'],
})
export class CabinetHomeComponent implements OnInit {
  showSpinner=false;

  projectCount=0;
  employeeCount=0;
  customerCount=0;

  projectColumns: string[] = ['name', 'teamLeader', 'status'];
  vacationColumns: string[]=['employee','vacationReason', 'startDate','endDate'];

  color = '#E91717';

  projectData = new MatTableDataSource<Project>(PROJECT_DATA);
  vacationData = new MatTableDataSource<Vacation>(VACATION_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
  }

  constructor( public cabinetService: CabinetService) {
    this.cabinetService.clearStorage();

    if(localStorage.getItem('token') != null && this.cabinetService.getDecodedAccessToken(localStorage.getItem('token') || "") != null){
      this.get_latest_n_projects(5);
      this.get_statistics();
      this.get_latest_n_vacations(5);
    }
  }

  get_latest_n_projects(count:number){
    this.showSpinner=true;
    this.cabinetService.getLatestNProjects(count).subscribe(data=>{
      this.projectData = data.response.data;
      this.showSpinner=false;
    })
  }

  get_statistics(){
    this.showSpinner=true;
    this.cabinetService.getStatistics().subscribe(data=>{
      this.projectCount=data.response.projectCount;
      this.customerCount=data.response.customerCount;
      this.employeeCount=data.response.employeeCount;
      this.showSpinner=false;
    })
  }

  get_latest_n_vacations(count:number){
    this.showSpinner=true;
    this.cabinetService.getLatestNVacations(count).subscribe(data=>{
      this.vacationData=data.response.data;

      this.showSpinner=false;
    })
  }
  changeFormatDateV2(date:string){
    return this.cabinetService.changeFormatDateV2(date);
  }

  ngOnInit(): void {
  }
}
