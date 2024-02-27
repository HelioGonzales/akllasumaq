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
import { NgxStripeModule } from 'ngx-stripe';

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
    LoginModule,
    NgxStripeModule.forRoot('pk_test_51OmLekBbaf2Jg1z4pFhcuQIum2u4K57XWoD9qFtx5PXswRiZAt3o9PTtJR3GZBREyrnhprByBdCbpDub0loZWXAo00XoLiKlDl')
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(cartSvc: CartService) {
    cartSvc.initCartLocalStorage()
  }
}
