import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CabinetService } from 'src/app/cabinet/cabinet.service';

export interface DialogData {
  label: string,
  id: any
}

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  data:any;
  label: string;
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA)  data: DialogData, public cabinetService: CabinetService) {
    this.data = data;
    this.label = data.label;
    this.id = data.id;
  }


  deleteFunction(){
    if(this.label == "vacation_reason"){
      this.cabinetService.deleteVacationReason(this.id).subscribe(data=>{
      if (data.status.errCode != 0) {
        this.cabinetService.messageDialog(data.status.message, false);
      } else {
        this.cabinetService.messageDialog(data.status.message, true);
      }
    });
    } else if (this.label == "project_status"){
      this.cabinetService.deleteProjectStatus(this.id).subscribe(data=>{
        if (data.status.errCode != 0) {
          this.cabinetService.messageDialog(data.status.message, false);
        } else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    } else if (this.label == "position"){
      this.cabinetService.deletePosition(this.id).subscribe(data=>{
        if (data.status.errCode != 0) {
          this.cabinetService.messageDialog(data.status.message, false);
        } else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    } else if (this.label == "customer"){
      this.cabinetService.deleteCustomer(this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        }else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    } else if (this.label == "project"){
      this.cabinetService.deleteProject(this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        }else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    } else if (this.label == "employee"){
      this.cabinetService.deleteEmployee(this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        }else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    } else if (this.label == "vacation"){
      this.cabinetService.deleteVacation(this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        }else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    } else if (this.label == "salary"){
      this.cabinetService.deleteSalary(this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        }else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    } else if (this.label == "bonusAndPrize"){
      this.cabinetService.deleteBonusAndPrize(this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        }else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    }
    else if (this.label == "resetPassword"){
      this.cabinetService.resetPassword(this.id).subscribe(data=>{
        if (data.errorCode && data.errorCode == 1) {
          this.cabinetService.messageDialog(data.status.message, false);
        }else {
          this.cabinetService.messageDialog(data.status.message, true);
        }
      })
    }
    
  }

  ngOnInit(): void {
  }

}
