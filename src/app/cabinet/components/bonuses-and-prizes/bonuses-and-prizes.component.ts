import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CabinetService } from '../../cabinet.service';
import { AddSalaryComponent } from '../dialogs/add-salary/add-salary.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { AddBonusAndPrizeComponent } from '../dialogs/add-bonus-and-prize/add-bonus-and-prize.component';

export interface BonusPrize {
  id: number;
  employee: string;
  amount: string;
  date: string;
  reason: string;
  project: string;
  isPrize: boolean;
}

interface Status {
  id: number;
  name: string;
  key: string;
  color: string;
}

interface Project {
  id: number;
  name: string;
  teamLeaderId: number;
  statusId: number;
  teamLeader: null;
  status: null;
}

@Component({
  selector: 'app-bonuses-and-prizes',
  templateUrl: './bonuses-and-prizes.component.html',
  styleUrls: ['./bonuses-and-prizes.component.scss']
})
export class BonusesAndPrizesComponent implements OnInit {
  bonusesPrizesArray: BonusPrize[] = [];
  statusArray: Status[] = [];
  projectsArray: Project[] = [];

  color = '#E91717';

  limit: any = 5;
  pageIndex: any = 0;
  skip: any = 0;


  filterForm: FormGroup = this.fb.group({
    employee: "",
    date: null,
    amount: null
  });
  

  displayedColumns: string[] = ['employee', 'amount', 'date', 'reason', 'actions'];
  dataSource = new MatTableDataSource<BonusPrize>(this.bonusesPrizesArray);
  showSpinner = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<BonusPrize>(this.bonusesPrizesArray);
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: any) {
    this.showSpinner = true;
    this.limit = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getBonusesAndPrizes(
      this.filterForm.value,
      event.pageSize,
      event.pageSize * event.pageIndex,
      false
    );
  }

  openDialog(label: string, id: any) {
    console.log(id);
    this.dialog.open(AddBonusAndPrizeComponent, {
      data: { label: `${label}`, id: id },
    });
  }

  

  constructor(
    public dialog: MatDialog,
    public cabinetService: CabinetService,
    private fb: FormBuilder
  ) {
    this.cabinetService.clearStorage();
    this.get_status();
    this.get_project();

    console.log(this.filterForm.controls.value);
    
    this.getBonusesAndPrizes({ "employee": this.filterForm.controls.employee.value, 
    "date": this.filterForm.controls.date.value, 
  }, 5, 0, false);
  }

  filter_bonuses() {
    this.filterForm.value.date=this.cabinetService.changeFormatDateV3(this.filterForm.controls.date.value)

    console.log({ "employee": this.filterForm.controls.employee.value, "date": this.filterForm.value.date, "amount": this.filterForm.controls.amount.value })
    this.showSpinner = true;
    this.getBonusesAndPrizes({ "employee": this.filterForm.controls.employee.value, "date": this.filterForm.value.date, "amount": this.filterForm.controls.amount.value }, this.limit, this.skip, false);
  }

  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }

  deleteBonusAndPrize(id:number){
    this.openDeleteDialog("bonusAndPrize", id);
  }

  // deleteBonusAndPrize(id: number) {
  //   this.cabinetService.deleteBonusAndPrize(id).subscribe((data) => {
  //     console.log(data);
  //     if (data.errorCode && data.errorCode == 1) {
  //       this.cabinetService.messageDialog(data.status.message, false);
  //     } else {
  //       this.cabinetService.messageDialog(data.status.message, true);
  //     }
  //   });
  // }

  ngOnInit(): void {
  }

  get_status() {
    this.cabinetService.getProjectStatusEmployee().subscribe((data) => {
      this.statusArray = data.result;
    });
  }
  get_project() {
    this.cabinetService.getProjectsEmployee().subscribe((data) => {
      this.projectsArray = data.result;
    });
  }


  getBonusesAndPrizes(
    filterModel: any,
    limit: number,
    skip: number,
    isExport: boolean
  ) {
    this.bonusesPrizesArray = [];
    this.cabinetService
      .getBonusesAndPrizes(
        {"employee": filterModel.employee, "date": filterModel.date, "amount": filterModel.amount},
        limit, skip, isExport
      )
      .subscribe((data) => {
        console.log(data.response.data)
        for (let element of data.response.data) {
          this.bonusesPrizesArray.push({
            id: element.id,
            date: element.date,
            employee: element.employee,
            amount: element.amount,
            reason: element.reason,
            project: element.project,
            isPrize: element.isPrize
          });

        }
        this.paginator.length = data.response.total;
        this.dataSource = new MatTableDataSource<BonusPrize>(this.bonusesPrizesArray);
        this.showSpinner = false;
      });
  }

  changeFormatDate(date:string) {
   return this.cabinetService.changeFormatDateV4(date);
  }

}
