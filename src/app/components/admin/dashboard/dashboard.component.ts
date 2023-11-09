import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProducts!: any
  totalOrders!: any
  totalSales!: any

  constructor(private productsSvc: ProductsService, private ordersSvc: OrdersService) { }

  ngOnInit(): void {
    this._getTotalProducts()
    this._getTotalOrders()
    this._getTotalSales()
  }

  private _getTotalProducts() {
    this.productsSvc.getTotalProducts().subscribe(res => {
      this.totalProducts = res
    })
  }

  private _getTotalOrders() {
    this.ordersSvc.getTotalOrders().subscribe(res => {
      this.totalOrders = res
    })
  }

  private _getTotalSales() {
    this.ordersSvc.getTotalSales().subscribe(res => {
      this.totalSales = res
      console.log(this.totalSales.totalsales[0].totalsales);

    })
  }

}
