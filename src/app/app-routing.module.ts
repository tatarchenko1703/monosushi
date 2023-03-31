import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscountComponent } from './pages/discount/discount.component';

import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

import { HomeComponent } from './pages/home/home.component';
import { DiscountDetailComponent } from './pages/discount-detail/discount-detail.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { BasketComponent } from './component/basket/basket.component';
import { LoginComponent } from './pages/login/login.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';


import { AdminComponent } from './pages/admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminGroupComponent } from './admin/admin-group/admin-group.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'discount/:id', component: DiscountDetailComponent },
  { path: 'product/:category/:group', component: ProductComponent },
  {
    path: 'product/:id', component: ProductInfoComponent, resolve: {
      productInfo: ProductInfoResolver
    }
  },
  // { path: 'auth', component: LoginComponent },
  { path: 'cabinet', component: CabinetComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'confirm', component: AdminComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],children: [
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'group', component: AdminGroupComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
