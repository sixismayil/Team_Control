import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../../cabinet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface Project {
  project: string;
  status: string;
  teamLeader: string;
  role: string;
}

const PROJECT_DATA: Project[] = [
];

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  id = 0;
  responseNull = false;
  showSpinner = false;
  customerFullname = "";
  customerPosition = "";
  customerPhoneNumber = "";
  customerEmail = "";
  participatedProjects:string[]=[];
  color = '#E91717';
  projectData = new MatTableDataSource<Project>(PROJECT_DATA);
  projectDataLength = 0;
  projectsColumns: string[] = ['project', 'status', 'teamLeader', 'role'];

  constructor(private route: ActivatedRoute, public cabinetService: CabinetService) {
    this.cabinetService.clearStorage();
      this.route.queryParams.subscribe(params => {
        this.showSpinner = true;
        this.cabinetService.getCustomer(+params.id).subscribe(data => {
          if (data.response == null) {
            this.responseNull = true;
          } else {
            this.responseNull = false;
            this.customerFullname = data.response.name + ' ' + data.response.surname;
            this.customerPosition = data.response.position;
            this.customerPhoneNumber = data.response.phoneNumber;
            this.customerEmail = data.response.email;
          }
          this.showSpinner = false;
        });
        this.showSpinner = true;
        this.cabinetService.getProjectsParticipated(+params.id).subscribe(data=>{
          this.participatedProjects=data.response.data;
          this.showSpinner = false;
        });
        this.showSpinner = true;
        this.cabinetService.getProjectsDetailed(+params.id).subscribe(data=>{
          this.projectData = data.response.data;
          this.showSpinner = false;      console.log(data);

        })
      });

  }

  ngOnInit(): void {
  }

}
