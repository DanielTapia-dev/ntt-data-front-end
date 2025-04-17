import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { TableComponent } from './shared/components/table/table.component';
import { MainLayoutModule } from './layout/main-layout/main-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ConfirmModalComponent,
    SearchBarComponent,
    TableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MainLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
