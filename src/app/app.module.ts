import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { HeaderModule } from './shared/modules/header/components/header/header.module';
import { JwtInterceptor } from './shared/services/jwt.interceptor';
import { FooterModule } from './shared/modules/footer/footer.module';
import { LoginModule } from './shared/modules/login/login.module';
import { CartService } from './shared/services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    LoginModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(cartSvc: CartService) {
    cartSvc.initCartLocalStorage()
  }
}
