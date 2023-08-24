import { Component, OnInit , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from  '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddCustomerComponent } from '../../dialogs/add-customer/add-customer.component';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { DeleteComponent } from '../../dialogs/delete/delete.component';

export interface Customer {
  id: number,
  fullname: string,
  phoneNumber: string,
  projects: string[]
}

interface Status {
  id: number,
  name: string,
  key: string,
  color: string
}

interface Project {
  id:number,
  name:string,
  teamLeaderId:number,
  statusId:number,
  teamLeader:null,
  status:null
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  statusArray: Status[] = [];
  projectsArray: Project[] = [];
  customersArray: Customer[]=[];

  displayedColumns: string[] = ['fullname', 'phoneNumber', 'projects', 'actions'];
  dataSource = new MatTableDataSource<Customer>(this.customersArray);
  showSpinner=true;
  color = '#E91717';
  limit:any=5;
  pageIndex:any=0;
  skip:any=0;

  filterForm: FormGroup = this.fb.group({
    fullname: null,
    projectStatusId: 0,
    projectId: 0
  });

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Customer>(this.customersArray);
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog,  public cabinetService: CabinetService, private fb: FormBuilder) {

    this.cabinetService.clearStorage();
      this.get_status();
      this.get_project();
      this.get_customers(this.filterForm.value, 5, 0, false);
  }

  openDialog(label: string, id: any){
    this.dialog.open(AddCustomerComponent, {
      data:{label: `${label}`, id: id}
    });
  }
  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }

  delete_customer(id:number){
    this.openDeleteDialog("customer", id);
  }

  filter_customers(){
    this.showSpinner=true;
    this.get_customers(this.filterForm.value,  this.limit, this.skip, false);
  }

  pageChanged(event: any) {
  this.showSpinner=true;
   this.limit=event.pageSize;
   this.pageIndex=event.pageIndex;
   this.get_customers(this.filterForm.value,  event.pageSize,  event.pageSize * event.pageIndex, false);
  }

  get_status(){
  this.cabinetService.getProjectStatusCustomer().subscribe(data=>{
    this.statusArray = data.result;
  })
  }

  get_project(){
    this.cabinetService.getProjectsCustomer().subscribe(data=>{
      this.projectsArray = data.result;
    })
  }

  get_customers(filterModel:any, limit:number, skip:number, isExport:boolean){
    this.customersArray = [];
    this.cabinetService.getCustomers(
    {"fullname": filterModel.fullname, "projectId": filterModel.projectId, "projectStatusId": filterModel.projectStatusId},
    limit, skip, isExport
    ).subscribe(data => {
      for(let element of data.response.data){
        this.customersArray.push(
        { id: element.id,
          fullname: `${element.firstname} ${element.lastname}`,
          phoneNumber: element.phoneNumber,
          projects: element.projects.split(',')})
      }
      this.paginator.length = data.response.total;
      this.dataSource = new MatTableDataSource<Customer>(this.customersArray);
      this.showSpinner=false;
    })
  }

  ngOnInit(): void {
  }

}
