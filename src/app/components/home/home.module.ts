import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
]

@NgModule({
  declarations: [HeroComponent, WelcomeComponent, HomeComponent, ProductsCarouselComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
