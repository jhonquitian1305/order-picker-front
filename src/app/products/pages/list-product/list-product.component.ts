import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'product-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class  ListProductComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe( paginationProducts => this.products = paginationProducts.content)
  }

}
