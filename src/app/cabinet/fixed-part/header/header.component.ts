import { Component, OnInit } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, RoutesRecognized, RouterState } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  panelOpenState = false;
  constructor(public cabinetService: CabinetService,private router: Router) {

  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
