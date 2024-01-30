import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { authGuard } from 'src/app/shared/services/auth-guard.guard';


const routes: Routes = [
  {
    path: '',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    component: CheckoutComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  }
]

@NgModule({
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule
  ],
  exports: [CartIconComponent, CartPageComponent, RouterModule]
})
export class OrdersModule { }
