import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    Text: string,
    obj_message: any,
    isRefresh: boolean
}

@Component({
    templateUrl: './message-dialog.component.html'
})
export class MessageDialogComponent {
    data: any;
    constructor(@Inject(MAT_DIALOG_DATA)  data: DialogData, private dialog: MatDialog) {
     this.data = data;
    }
     reload(){
         window.location.reload();
     }
     isRefresh(value: boolean)
     {
         if(value)
         {
             window.location.reload();
         }
     }
}
