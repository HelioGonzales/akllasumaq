import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent {

  // @Input() categories: Category[] = []
}
