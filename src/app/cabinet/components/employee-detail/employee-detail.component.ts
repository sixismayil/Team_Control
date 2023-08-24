import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../../cabinet.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Salary } from '../salaries/salaries.component';
import { BonusPrize } from '../bonuses-and-prizes/bonuses-and-prizes.component';
import { Vacation } from '../vacations/vacations.component';

const PROJECT_DATA: Project[] = [];

const SALARY_DATA: Salary[] = [];

const BONUS_DATA: BonusPrize[] = [];

const PREMIUM_DATA: BonusPrize[] = [];

const VACATION_DATA: Vacation[]=[];


export interface Project {
  id:number;
  project: string;
  status: string;
  teamLeader: string;
  role: string;
}

export interface Position{
id:number;
name:string
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})

export class EmployeeDetailComponent implements OnInit {
  id = 0;
  responseNull = false;
  showSpinner = false;
  employeeFullname = "";
  employeePosition = "";
  employeePhoneNumber = "";
  employeeEmail = "";
  employeeBirthdate = "";
  employeeAdress = "";
  employeeRelPhone = "";
  employeeRecruitmentDate= "";
  employeeBiography= "";


  participatedProjects:string[]=[];
  color = '#E91717';
  projectData = new MatTableDataSource<Project>(PROJECT_DATA);
  salaryData = new MatTableDataSource<Salary>(SALARY_DATA);
  bonusData = new MatTableDataSource<BonusPrize>(BONUS_DATA);
  premiumData = new MatTableDataSource<BonusPrize>(PREMIUM_DATA);
  vacationData = new MatTableDataSource<Vacation>(VACATION_DATA);


  projectDataLength = 0;
  salaryDataLength = 0;
  bonusDataLength = 0;
  premiumDataLength = 0;
  vacationDataLength = 0;
  projectsColumns: string[] = ['project', 'status', 'teamLeader', 'role'];
  salariesColumns: string[] = ['date', 'amount', 'salary'];
  bonusesColumns: string[] = ['date', 'amount', 'project'];
  premiumsColumns:string[] = ['date', 'amount', 'reason'];
  vacationsColumns:string[] = ['date', 'period', 'reason'];

positionsArray:Position[]=[];
positionsArray2:string[]=[];

  constructor(private route: ActivatedRoute, public cabinetService: CabinetService) {
   this.cabinetService.getPositionsEmployee().subscribe(data=>{
    //  console.log(data);
     for(let element of data.result){
       this.positionsArray.push({id:element.id, name:element.name} )
     }
    //  console.log(this.positionsArray);
   })
   this.cabinetService.clearStorage();

    this.route.queryParams.subscribe(params => {
      this.showSpinner = true;
      this.cabinetService.getEmployee(+params.id).subscribe(data => {
        if (data.response == null) {
          this.responseNull = true;
        } else {
          this.responseNull = false;
          this.employeeFullname = data.response.name + ' ' + data.response.surname;
          this.employeePhoneNumber = data.response.phoneNumber;
          this.employeeEmail = data.response.email;
          this.employeeBirthdate = data.response.birthdate;
          this.employeeAdress = data.response.address;
          this.employeeRelPhone = data.response.relativesPhoneNumber;
          this.employeeRecruitmentDate = data.response.recruitmentDate;
          this.employeeBiography = data.response.biography;
          for(let element of data.response.position){
            // this.positionsArray2.push(this.positionsArray[element].name)
            for(let position of this.positionsArray){
              if(position.id==element){
                this.positionsArray2.push(position.name)
              }

            }
          }
          this.employeePosition=this.positionsArray2.join(",")
          // this.employeePosition = data.response.position
        }
        this.showSpinner = false;
      });
      this.showSpinner = true;
      this.cabinetService.getProjectsEmployeeParticipated(+params.id).subscribe(data=>{
        this.participatedProjects=data.response.data;
        this.showSpinner = false;
      });
      this.showSpinner = true;
      this.cabinetService.getSalariesDetailed(+params.id).subscribe(data=>{
        this.salaryData = data.response.data;
        this.salaryDataLength = data.response.data.length;
        this.showSpinner = false;
        // console.log(data);
      });
      this.showSpinner = true;
      this.cabinetService.getBonusesDetailed(+params.id).subscribe(data=>{
        this.bonusData = data.response.data;
        this.bonusDataLength = data.response.data.length;
        this.showSpinner = false;
        // console.log(data);
      })
      this.showSpinner = true;
      this.cabinetService.getPremiumsDetailed(+params.id).subscribe(data=>{
        this.premiumData = data.response.data;
        this.premiumDataLength = data.response.data.length;
        this.showSpinner = false;
        // console.log(data);
      })
      this.showSpinner = true;
      this.cabinetService.getVacationsDetailed(+params.id).subscribe(data=>{
        this.vacationData = data.response.data;
        this.vacationDataLength = data.response.data.length;
        this.showSpinner = false;
        console.log(data);
      })
      
    });
  }


  ngOnInit(): void {
  }

  changeFormatDate(date:string) {
    return this.cabinetService.changeFormatDateV4(date);
   }

}
