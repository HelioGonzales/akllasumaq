import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnDestroy {
  product!: Product
  productid!: string
  quanity!: number
  endSubs$ = new Subject<void>()

  constructor(private activatedRoute: ActivatedRoute, private productsSvc: ProductsService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productid = params['productid']

    })

    this._getProduct(this.productid)
  }

  addToCart() { }

  private _getProduct(id: string) {
    this.productsSvc.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.product = product
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }

}
