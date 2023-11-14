import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { DescriptionComponent } from './description/description.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoriesService } from 'src/app/shared/services/categories.service';

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    children: [
      {
        path: "",
        component: ProductCategoriesComponent
      },
      {
        path: "soap",
        component: ProductListComponent,
      },
      {
        path: "soap/description",
        component: DescriptionComponent
      }
    ]
  },
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCategoriesComponent,
    ProductListComponent,
    DescriptionComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  providers: [CategoriesService]

})
export class ProductsModule { }
