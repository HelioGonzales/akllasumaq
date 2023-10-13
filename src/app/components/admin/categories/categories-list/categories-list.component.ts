import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = []
  constructor(private categoriesSvc: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoriesSvc.getCategories().subscribe(res => {
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
        this.categoriesSvc.deleteCategory(categoryId).subscribe(res => {
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
}


