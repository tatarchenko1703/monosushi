import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscountComponent } from './pages/discount/discount.component';

import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

import { HomeComponent } from './pages/home/home.component';
import { DiscountDetailComponent } from './pages/discount-detail/discount-detail.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { BasketComponent } from './pages/basket/basket.component';

import { AdminComponent } from './pages/admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminGroupComponent } from './admin/admin-group/admin-group.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount/:id', component: DiscountDetailComponent },
  { path: 'product/:category/:group', component: ProductComponent },
  {
    path: 'product/:id', component: ProductInfoComponent, resolve: {
      productInfo: ProductInfoResolver
  }
    
  },

  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'confirm', component: AdminComponent },
  {
    path: 'admin', component: AdminComponent, children: [
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
