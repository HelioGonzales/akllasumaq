import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { ORDER_STATUS } from 'src/app/shared/order.constants';
import { OrdersService } from 'src/app/shared/services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  orderId!: string
  orderDetails!: Order
  orderStatus = ORDER_STATUS
  statusChanged: any
  endSubs$ = new Subject<void>()

  constructor(private ordersSvc: OrdersService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(orderId => {
      if (orderId['id']) {
        this.orderId = orderId['id']
        this._getOrder(this.orderId)
      }
    })

  }

  private _getOrder(orderId: string) {
    this.ordersSvc.getOrder(orderId).pipe(takeUntil(this.endSubs$)).subscribe(orderDetails => {
      this.orderDetails = orderDetails
      this.statusChanged = this.orderDetails.status
      console.log(this.orderDetails);





    })
  }

  onStatusChange(event: any) {
    // this.statusChanged = event.target.value

    this.ordersSvc.updateOrder({
      status: event.target.value
    }, this.orderId).pipe(takeUntil(this.endSubs$)).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Order updated successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // this.router.navigate(['/admin/orders'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update order',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
        })


      })


  }

  calculateTotalPrice(item: any): number {
    return (item.product?.price || 0) * (item.quantity || 0);
  }

  parseStatusIndex(status: any): number {
    const index = +status;
    return !isNaN(index) ? index : -1; // Return -1 if the conversion fails
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }

}
