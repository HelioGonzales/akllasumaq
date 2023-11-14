import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderModule } from './shared/modules/header/components/header/header.module';
import { FooterModule } from './shared/modules/footer/footer.module';
import { LoginModule } from './shared/modules/login/login.module';
import { JwtInterceptor } from './shared/services/jwt.interceptor';
import { CategoriesService } from './shared/services/categories.service';

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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
