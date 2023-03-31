import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminGroupComponent } from './admin/admin-group/admin-group.component';

import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { ConfirmComponent } from './component/confirm/confirm/confirm.component';
import { BasketComponent } from './component/basket/basket.component';

import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountDetailComponent } from './pages/discount-detail/discount-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { LoginComponent } from './pages/login/login.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminCategoryComponent,
    AdminDiscountComponent,
    AdminOrderComponent,
    AdminProductComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    AdminComponent,
    DeliveryComponent,
    DiscountComponent,
    DiscountDetailComponent,
    HomeComponent,
    ProductComponent,
    AdminGroupComponent,
    ConfirmComponent,
    ProductInfoComponent,
    LoginComponent,
    BasketComponent,
    CabinetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
