import { Component } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent {
  categories: Category[] = []

  constructor(private categoriesSvc: CategoriesService) { }

  ngOnInit(): void {
    this._getCategories()
  }

  private _getCategories() {
    this.categoriesSvc.getCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories
    })
  }
}
