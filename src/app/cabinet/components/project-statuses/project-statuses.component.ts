import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from  '@angular/material/dialog';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { AddProjectStatusComponent } from '../dialogs/add-project-status/add-project-status.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
export interface ProjectStatus{
  id: number,
  name: string,
  key:string,
  color:string,
}

@Component({
  selector: 'app-project-statuses',
  templateUrl: './project-statuses.component.html',
  styleUrls: ['./project-statuses.component.scss']
})

export class ProjectStatusesComponent implements OnInit {
  projectStatusArray: ProjectStatus[]=[];
  displayedColumns: string[] = ['name', 'color', 'actions'];
  dataSource = new MatTableDataSource<ProjectStatus>(this.projectStatusArray);
  showSpinner=true;
  color = '#E91717';
  limit:any=5;
  pageIndex:any=0;
  skip:any=0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<ProjectStatus>(this.projectStatusArray);
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog,  public cabinetService: CabinetService) {
    this.cabinetService.clearStorage();
    this.get_project_statuses(5, 0, false);
  }

  openDialog(label: string, id: any){
    this.dialog.open(AddProjectStatusComponent, {
      data:{label: `${label}`, id: id}
    });
  }

  get_project_statuses(limit:number, skip:number, isExport:boolean){
    this.projectStatusArray=[];
    this.cabinetService.getProjectStatuses(limit,skip,isExport).subscribe(data=>{
      for(let element of data.response.data){
        this.projectStatusArray.push({
          id: element.id,
          name: element.name,
          key: element.key,
          color:element.color
        })
      }
      this.paginator.length = data.response.total;
      this.dataSource = new MatTableDataSource<ProjectStatus>(this.projectStatusArray);
      this.showSpinner=false;
    })
  }
  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }

  delete_project_status(id:any){
    this.openDeleteDialog("project_status", id);
  }

  pageChanged(event: any) {
    this.showSpinner=true;
    this.limit=event.pageSize;
    this.pageIndex=event.pageIndex;
    this.get_project_statuses(event.pageSize,  event.pageSize * event.pageIndex, false);
  }

  ngOnInit(): void {
  }

}
