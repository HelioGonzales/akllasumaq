import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = []
  endSubs$ = new Subject<void>()

  constructor(private categoriesSvc: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoriesSvc.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.categories = res
    })
  }

  deleteCategory(categoryId: string) {
    Swal.fire({
      title: 'Delete Category',
      text: `Are you sure you want to delete the category"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesSvc.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$)).subscribe(res => {
          this.getCategories()
        },
          error => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete category',
              icon: 'error',
              showConfirmButton: false, // Remove the confirm button
              timer: 3000, // Automatically close after 3 seconds (adjust the timer as needed)
            })
          })
      } else if (result.isDismissed) {
        return this.getCategories()
      }
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`admin/categories/form/${categoryId}`)
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}


