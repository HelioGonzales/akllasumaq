import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []
  constructor(private categoriesSvc: CategoriesService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoriesSvc.getCategories().subscribe(res => {
      console.log(res);

      this.categories = res
    })
  }
}
