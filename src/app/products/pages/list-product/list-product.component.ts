import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'product-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class  ListProductComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  createProduct(): void{
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: "30%",
      height: "55%"
    });
    dialogRef.afterClosed()
      .subscribe( () => this.getProducts())
  }

  getProducts(){
    this.productService.getAll()
      .subscribe( paginationProducts => this.products = paginationProducts.content)
  }

}
