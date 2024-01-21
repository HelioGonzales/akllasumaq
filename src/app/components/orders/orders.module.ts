import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {
    path: '',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
]

@NgModule({
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule
  ],
  exports: [CartIconComponent, CartPageComponent, RouterModule]
})
export class OrdersModule { }
