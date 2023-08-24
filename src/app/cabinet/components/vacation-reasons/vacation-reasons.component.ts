import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from  '@angular/material/dialog';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { AddVacationReasonComponent } from '../dialogs/add-vacation-reason/add-vacation-reason.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';

export interface VacationReason{
  id: number,
  name: string,
  key: string
}

@Component({
  selector: 'app-vacation-reasons',
  templateUrl: './vacation-reasons.component.html',
  styleUrls: ['./vacation-reasons.component.scss']
})

export class VacationReasonsComponent implements OnInit {
  vacationReasonsArray: VacationReason[]=[];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<VacationReason>(this.vacationReasonsArray);
  showSpinner=true;
  color = '#E91717';
  limit:any=5;
  pageIndex:any=0;
  skip:any=0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<VacationReason>(this.vacationReasonsArray);
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog,  public cabinetService: CabinetService) {
    this.cabinetService.clearStorage();

    this.get_vacation_reasons(5, 0, false);
  }

  openDialog(label: string, id: any){
    this.dialog.open(AddVacationReasonComponent, {
      data:{label: `${label}`, id: id}
    });
  }

  get_vacation_reasons(limit:number, skip:number, isExport:boolean){
    this.vacationReasonsArray=[];
    this.cabinetService.getVacationReasons(limit,skip,isExport).subscribe(data=>{
      for(let element of data.response.data){
        this.vacationReasonsArray.push({
          id: element.id,
          name: element.name,
          key: element.key
        })
      }
      this.paginator.length = data.response.total;
      this.dataSource = new MatTableDataSource<VacationReason>(this.vacationReasonsArray);
      this.showSpinner=false;
    })
  }

  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }

  delete_vacation_reason(id: any){
    this.openDeleteDialog("vacation_reason", id);
  }

  pageChanged(event: any) {
    this.showSpinner=true;
    this.limit=event.pageSize;
    this.pageIndex=event.pageIndex;
    this.get_vacation_reasons(event.pageSize,  event.pageSize * event.pageIndex, false);
  }

  ngOnInit(): void {
  }

}
