import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { OrdersModule } from 'src/app/components/orders/orders.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule, RouterModule, OrdersModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
