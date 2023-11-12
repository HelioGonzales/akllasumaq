import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalProducts!: any
  totalOrders!: any
  totalSales!: any
  endSubs$ = new Subject<void>()

  constructor(private productsSvc: ProductsService, private ordersSvc: OrdersService) { }

  ngOnInit(): void {
    this._getTotalProducts()
    this._getTotalOrders()
    this._getTotalSales()
  }

  private _getTotalProducts() {
    this.productsSvc.getTotalProducts().pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.totalProducts = res
    })
  }

  private _getTotalOrders() {
    this.ordersSvc.getTotalOrders().pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.totalOrders = res
    })
  }

  private _getTotalSales() {
    this.ordersSvc.getTotalSales().pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.totalSales = res
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }

}
