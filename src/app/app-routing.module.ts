import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ContainerComponent } from './container/container.component';
import { AddProductsComponent } from './pages/admin/add-products/add-products.component';
import { AddStoresComponent } from './pages/admin/add-stores/add-stores.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ShopProductsComponent } from './pages/admin/shop-products/shop-products.component';
import { StoresComponent } from './pages/admin/stores/stores.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { UpdateStoreComponent } from './pages/admin/update-store/update-store.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import {NotificationPageComponent} from './notification-page/notification-page.component'
const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },
  {
    path:'product-page',
    component:ProductPageComponent,
    pathMatch:'full',
  },
  {
    path:'user-container/:type',
    component:ContainerComponent,
    pathMatch:'full',
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:"forgot-password",
    component:ForgotPasswordComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    children:[
      {
        path:'',
        component:WelcomeAdminComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'stores',
        component:StoresComponent
      },
      {
        path:'add-store',
        component:AddStoresComponent
      },
      {
        path:'update-store',
        component:UpdateStoreComponent

      },
      {
        path:'update-product',
        component:UpdateProductComponent

      },
      {
        path:'add-product',
        component:AddProductsComponent
      },
      {
        path:'shop-products',
        component:ShopProductsComponent

      }
    ],
    canActivate:[AdminGuard],
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
  },
  {
    path:'notification-page',
    component:NotificationPageComponent,
    pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
