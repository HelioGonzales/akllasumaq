import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: Category[] = []
  endSubs$ = new Subject<void>()

  constructor(private categoriesSvc: CategoriesService) { }

  ngOnInit(): void {
    this._getCategories()
  }

  private _getCategories() {
    this.categoriesSvc.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }

}
