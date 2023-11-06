import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { ORDER_STATUS } from 'src/app/shared/order.constants';
import { OrdersService } from 'src/app/shared/services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = []
  orderStatus = ORDER_STATUS



  constructor(private ordersSvc: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this._getOrders()



  }


  showOrder(orderId: string) {
    this.router.navigateByUrl(`admin/orders/${orderId}`)
  }

  deleteOrder(orderId: string) {
    Swal.fire({
      title: 'Delete Order',
      text: `Are you sure you want to delete the order"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersSvc.deleteOrder(orderId).subscribe(res => {
          this._getOrders()
        },
          error => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete order',
              icon: 'error',
              showConfirmButton: false, // Remove the confirm button
              timer: 3000, // Automatically close after 3 seconds (adjust the timer as needed)
            })
          })
      } else if (result.isDismissed) {
        return this._getOrders()
      }
    });
  }

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
