import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsModule } from '../products/products.module';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
]

@NgModule({
  declarations: [HeroComponent, WelcomeComponent, HomeComponent, ProductsHomeComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
