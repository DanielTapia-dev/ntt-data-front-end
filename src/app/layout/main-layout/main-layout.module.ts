import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
