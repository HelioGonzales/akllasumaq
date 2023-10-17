import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  products: Product[] = []

  constructor(private productsSvc: ProductsService) {
    this._getProducts()
  }

  private _getProducts() {
    this.productsSvc.getProducts().subscribe(res => {
      this.products = res
    })
  }

  updateProduct(categoryId: any) { }
  deleteProduct(categoryId: any) { }
}
