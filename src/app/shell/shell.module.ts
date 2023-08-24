import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    MaterialModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  declarations: [ShellComponent, HeaderComponent, FooterComponent],
})
export class ShellModule {}
