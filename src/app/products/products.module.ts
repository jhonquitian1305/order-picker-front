import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { CardComponent } from './components/card/card.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NewProductComponent } from './pages/new-product/new-product.component';


@NgModule({
  declarations: [
    ListProductComponent,
    CardComponent,
    ProductPageComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ProductsRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ]
})
export class ProductsModule { }
