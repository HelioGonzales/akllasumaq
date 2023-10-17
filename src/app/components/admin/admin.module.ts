import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { ShellComponent } from './shell/shell.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { ProductsListComponent } from './products/products-list/products-list.component';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      }
    ]

  }
]

@NgModule({
  declarations: [AdminComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesListComponent, CategoriesFormComponent, ProductsFormComponent, ProductsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoriesService]
})
export class AdminModule { }
