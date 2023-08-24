import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CabinetService } from '../../cabinet.service';
import { AddSalaryComponent } from '../dialogs/add-salary/add-salary.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';

export interface Salary {
  id: number;
  employee: string;
  date: string;
  amount: string;
  salary: string;
  isEdittable:boolean;
}

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {
  salariesArray: Salary[] = [];
  color = '#E91717';

  limit: any = 5;
  pageIndex: any = 0;
  skip: any = 0;


  filterForm: FormGroup = this.fb.group({
    employee: null,
    date: null,
    salary:null
  });
  
  displayedColumns: string[] = ['employee', 'date', 'amount', 'salary',  'actions'];
  dataSource = new MatTableDataSource<Salary>(this.salariesArray);
  showSpinner = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Salary>(this.salariesArray);
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: any) {
    this.showSpinner = true;
    this.limit = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.get_salaries(
      this.filterForm.value,
      event.pageSize,
      event.pageSize * event.pageIndex,
      false
    );
  }

  openDialog(label: string, id: any) {
    console.log(id);
    this.dialog.open(AddSalaryComponent, {
      data: { label: `${label}`, id: id },
    });
  }

  constructor(
    public dialog: MatDialog,
    public cabinetService: CabinetService,
    private fb: FormBuilder
  ) {
    this.get_salaries({"employee": this.filterForm.controls.employee.value, "date": this.filterForm.controls.date.value, "salary": this.filterForm.controls.salary.value}, 5, 0, false);
  }

  filter_salaries() {
    this.filterForm.value.date=this.cabinetService.changeFormatDateV3(this.filterForm.controls.date.value)
    console.log(this.filterForm.controls.date.value);

    console.log(this.filterForm.value)
    console.log( {"employee": this.filterForm.controls.employee.value, "date": this.filterForm.value.date, "salary": this.filterForm.controls.salary.value})
    this.showSpinner = true;
    // this.filterForm.controls.date.value.changeFormatDateV4();
    this.get_salaries({"employee": this.filterForm.controls.employee.value, "date": this.filterForm.value.date, "salary": this.filterForm.controls.salary.value}, this.limit, this.skip, false);
  }

  openDeleteDialog(label:string, id:number){
    this.dialog.open(DeleteComponent,{
      data:{label: `${label}`, id: id}
    });
  }

  delete_salary(id:number){
    this.openDeleteDialog("salary", id);
  }

  // delete_salary(id: number) {
  //   this.cabinetService.deleteSalary(id).subscribe((data) => {
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

  get_salaries(
    filterModel: any,
    limit: number,
    skip: number,
    isExport: boolean
  ) {
    this.salariesArray = [];
    this.cabinetService
      .getSalaries(
        {"employee": filterModel.employee, "date": filterModel.date, "salary": filterModel.salary},
        limit, skip, isExport
      )
      .subscribe((data) => {
        console.log(data.response.data)
        for (let element of data.response.data) {
          this.salariesArray.push({
            id: element.id,
            date: element.date,
            employee: element.employee,
            amount: element.amount,
            salary: element.salary,
            isEdittable:element.isEdittable
          });
        }
        this.paginator.length = data.response.total;
        this.dataSource = new MatTableDataSource<Salary>(this.salariesArray);
        this.showSpinner = false;
      });
  }


  changeFormatDate(date:string) {
   return this.cabinetService.changeFormatDateV4(date);
  }

}
