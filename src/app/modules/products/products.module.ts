import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
