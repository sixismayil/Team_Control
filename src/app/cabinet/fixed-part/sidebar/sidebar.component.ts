import { Component, Input, OnInit } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  sidenavWidth!:number;
  constructor(public cabinetService: CabinetService){

  }
  ngOnInit(): void {
  }

}
