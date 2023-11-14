import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

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
