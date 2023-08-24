import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from  '@angular/material/dialog';
import { AddPositionComponent } from '../dialogs/add-position/add-position.component';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { DeleteComponent } from '../dialogs/delete/delete.component';

export interface Position{
  id: number,
  name: string,
  key: string
}

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})

export class PositionsComponent implements OnInit {
  positionArray: Position[]=[];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Position>(this.positionArray);
  showSpinner=true;
  color = '#E91717';
  limit:any=5;
  pageIndex:any=0;
  skip:any=0;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Position>(this.positionArray);
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog,  public cabinetService: CabinetService) {
    this.cabinetService.clearStorage();

    this.get_positions(5, 0, false);
  }

  openDialog(label: string, id: any){
    this.dialog.open(AddPositionComponent, {
      data:{label: `${label}`, id: id}
    });
  }

  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }

  get_positions(limit:number, skip:number, isExport:boolean){
    this.positionArray=[];
    this.cabinetService.getPositions(limit,skip,isExport).subscribe(data=>{
      for(let element of data.response.data){
        this.positionArray.push({
          id: element.id,
          name: element.name,
          key: element.key
        })
      }
      this.paginator.length = data.response.total;
      this.dataSource = new MatTableDataSource<Position>(this.positionArray);
      this.showSpinner=false;
    })
  }

  delete_position(id:any){
    this.openDeleteDialog("position", id);
  }

  pageChanged(event: any) {
    this.showSpinner=true;
    this.limit=event.pageSize;
    this.pageIndex=event.pageIndex;
    this.get_positions(event.pageSize,  event.pageSize * event.pageIndex, false);
  }
  ngOnInit(): void {
  }

}
