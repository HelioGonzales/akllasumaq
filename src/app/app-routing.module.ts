import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/orders/checkout/checkout.component';


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "products",
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: "products/categories/:categoryid",
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: "about",
    loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: "contact",
    loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./shared/modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cart-page',
    loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule)
  },
  // {
  //   path: 'checkout',
  //   component: CheckoutComponent
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
