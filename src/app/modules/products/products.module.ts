import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
