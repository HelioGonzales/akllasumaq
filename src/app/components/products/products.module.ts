import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CategoryComponent } from './category/category.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    children: [
      {
        path: "jabones",
        component: CategoryComponent,
      },
      {
        path: "jabones/description",
        component: DescriptionComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCategoriesComponent,
    CategoryComponent,
    DescriptionComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
