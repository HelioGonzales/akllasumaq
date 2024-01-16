import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: CartPageComponent
  }
]

@NgModule({
  declarations: [
    CartIconComponent,
    CartPageComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule
  ],
  exports: [CartIconComponent, CartPageComponent]
})
export class OrdersModule { }
