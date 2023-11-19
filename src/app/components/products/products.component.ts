import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories: Category[] = []
  products: Product[] = []
  endSubs$ = new Subject<void>()

  constructor(private categoriesSvc: CategoriesService, private productsSvc: ProductsService) { }

  ngOnInit(): void {
    this._getCategories()
    this._getProducts()
  }

  private _getCategories() {
    this.categoriesSvc.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories
    })
  }

  private _getProducts() {
    this.productsSvc.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.products = products
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}
