import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { CabinetHomeComponent } from 'src/app/cabinet/components/cabinet-home/cabinet-home.component';
import { CabinetService } from 'src/app/cabinet/cabinet.service';

@NgModule({
  declarations: [CabinetHomeComponent],
  providers: [CabinetService],
  imports: [CommonModule, RouterModule, HomeRoutingModule, MaterialModule],
})
export class HomeModule {}
