import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { CardComponent } from './components/card/card.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';


@NgModule({
  declarations: [
    ListProductComponent,
    CardComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
