import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';

const ORDER_STATUS = [
  {
    label: 'Pending',
    color: 'primary'
  },
  {
    label: 'Process',
    color: 'warning'
  },
  {
    label: 'Shipped',
    color: 'info'
  },
  {
    label: 'Delivered',
    color: 'success'
  },
  {
    label: 'Failed',
    color: 'danger'
  }
];

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = []
  orderStatus = ORDER_STATUS



  constructor(private ordersSvc: OrdersService) { }

  ngOnInit(): void {
    this._getOrders()



  }


  showOrder(orderId: string) { }
  deleteOrder(orderId: string) { }

  parseStatusIndex(status: any): number {
    const index = +status;
    return !isNaN(index) ? index : -1; // Return -1 if the conversion fails
  }

  private _getOrders() {
    this.ordersSvc.getOrders().subscribe(res => {
      this.orders = res
    })
  }


}
