import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CabinetService } from '../../cabinet.service';
import { AddVacationComponent } from '../dialogs/add-vacation/add-vacation.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';

export interface Vacation {
  id: number;
  employee: string;
  startDate: string;
  vacationReason: string;
  period: string;
}

interface VacationReasonId {
  id: number;
  name: string;
}

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss'],
})
export class VacationsComponent implements OnInit {
  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  vacationsArray: Vacation[] = [];
  VacationReasonsArray: VacationReasonId[] = [];
  color = '#E91717';

  limit: any = 5;
  pageIndex: any = 0;
  skip: any = 0;


  filterForm: FormGroup = this.fb.group({
    employee: null,
    vacationReasonId: 0,
  });

  displayedColumns: string[] = ['employee', 'startDate', 'vacationReason', 'period', 'actions'];
  dataSource = new MatTableDataSource<Vacation>(this.vacationsArray);
  showSpinner = true;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Vacation>(this.vacationsArray);
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: any) {
    this.showSpinner = true;
    this.limit = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.get_vacations(
      this.filterForm.value,
      event.pageSize,
      event.pageSize * event.pageIndex,
      false
    );
  }

  openDialog(label: string, id: any) {
    console.log(id);
    this.dialog.open(AddVacationComponent, {
      data: { label: `${label}`, id: id },
    });
  }

  constructor(
    public dialog: MatDialog,
    public cabinetService: CabinetService,
    private fb: FormBuilder
  ) {
    this.cabinetService.clearStorage();

      this.get_VacationReasons();
      this.get_vacations({ "employee": this.filterForm.controls.employee.value, "startDate": this.range.controls.startDate.value, "endDate": this.range.controls.endDate.value, "vacationReasonId": this.filterForm.controls.vacationReasonId.value }, 5, 0, false);

  }
  filter_vacations() {
    this.range.value.startDate=this.cabinetService.changeFormatDateV3(this.range.controls.startDate.value)
    this.range.value.endDate=this.cabinetService.changeFormatDateV3(this.range.controls.endDate.value)

    console.log({ "employee": this.filterForm.controls.employee.value, "startDate": this.range.value.startDate, "endDate": this.range.value.endDate, "vacationReasonId": this.filterForm.controls.vacationReasonId.value })
    this.showSpinner = true;
    this.get_vacations({ "employee": this.filterForm.controls.employee.value, "startDate": this.range.value.startDate, "endDate": this.range.value.endDate, "vacationReasonId": this.filterForm.controls.vacationReasonId.value }, this.limit, this.skip, false);

    // this.get_vacations({ "employee": this.filterForm.controls.employee.value, "startDate": this.range.controls.startDate.value, "endDate": this.range.controls.endDate.value, "vacationReasonId": this.filterForm.controls.vacationReasonId.value }, this.limit, this.skip, false);
  }

  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }
  
  delete_vacation(id:number){
    this.openDeleteDialog("vacation", id);
  }
  // delete_vacation(id: number) {
  //   this.cabinetService.deleteVacation(id).subscribe((data) => {
  //     console.log(data);
  //     if (data.errorCode && data.errorCode == 1) {
  //       this.cabinetService.messageDialog(data.status.message, false);
  //     } else {
  //       this.cabinetService.messageDialog(data.status.message, true);
  //     }
  //   });
  // }

  ngOnInit(): void { }

  get_vacations(
    filterModel: any,
    limit: number,
    skip: number,
    isExport: boolean
  ) {
    this.vacationsArray = [];
    this.cabinetService
      .getVacations(
        { "employee": filterModel.employee, "startDate": filterModel.startDate, "endDate": filterModel.endDate, "vacationReasonId": filterModel.vacationReasonId },
        limit, skip, isExport
      )
      .subscribe((data) => {
        console.log(data.response.data)
        for (let element of data.response.data) {
          this.vacationsArray.push({
            id: element.id,
            startDate: element.startDate,
            employee: element.employee,
            vacationReason: element.vacationReason,
            period: element.period
          });
        }
        this.paginator.length = data.response.total;
        this.dataSource = new MatTableDataSource<Vacation>(this.vacationsArray);
        this.showSpinner = false;
      });
  }


  get_VacationReasons() {
    this.cabinetService.GetVacationReasons().subscribe((data) => {
      this.VacationReasonsArray = data.result;
    });
  }
  changeFormatDate(date:string) {
   return this.cabinetService.changeFormatDateV4(date);
  }

}
