import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PaginationProduct } from '../../interfaces/pagination-product.interface';

@Component({
  selector: 'product-list-product',
  templateUrl: './list-product.component.html',
  styles: ``
})
export class  ListProductComponent implements OnInit {

  public paginationProduct!: PaginationProduct;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe( paginationProducts => this.paginationProduct = paginationProducts)
  }

}
