import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = []
  endsSubs$ = new Subject<void>()

  constructor(private productsSvc: ProductsService, private router: Router) {

  }

  ngOnInit(): void {
    this._getProducts()
  }

  private _getProducts() {
    this.productsSvc.getProducts().pipe(takeUntil(this.endsSubs$)).subscribe(res => {
      this.products = res
    })
  }

  updateProduct(productId: any) {
    this.router.navigateByUrl(`admin/products/form/${productId}`)
  }

  deleteProduct(productId: any) {
    Swal.fire({
      title: 'Delete Product',
      text: `Are you sure you want to delete the product"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsSvc.deleteProduct(productId).pipe(takeUntil(this.endsSubs$)).subscribe(res => {
          this._getProducts()
        },
          error => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete product',
              icon: 'error',
              showConfirmButton: false, // Remove the confirm button
              timer: 3000, // Automatically close after 3 seconds (adjust the timer as needed)
            })
          })
      } else if (result.isDismissed) {
        return this._getProducts()
      }
    });
  }

  ngOnDestroy(): void {
    this.endsSubs$.next()
    this.endsSubs$.complete()

  }
}
