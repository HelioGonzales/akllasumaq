import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = []
  constructor(private categoriesSvc: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesSvc.getCategories().subscribe(res => {

      this.categories = res
    })

  }
}
