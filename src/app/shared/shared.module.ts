import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TableComponent } from './components/table/table.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AlertComponent,
    TableComponent,
    SearchBarComponent,
    ConfirmModalComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    TableComponent,
    SearchBarComponent,
    ConfirmModalComponent,
  ],
})
export class SharedModule {}
