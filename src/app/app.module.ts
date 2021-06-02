import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContainerComponent } from './container/container.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {ParticularProductDetailService} from './services/productService/particular-product-detail.service';
import { UserdashboardCategoryComponent } from './userdashboard-category/userdashboard-category.component';
import { ProductDataService } from './services/productService/product-data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxCaptchaModule} from 'ngx-captcha';
import { StoresComponent } from './pages/admin/stores/stores.component';
import { AddStoresComponent } from './pages/admin/add-stores/add-stores.component';
import { ShopProductsComponent } from './pages/admin/shop-products/shop-products.component';
import { AddProductsComponent } from './pages/admin/add-products/add-products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SlideRecommedationComponent } from './slide-recommedation/slide-recommedation.component';
import { RecommedationService } from './services/recommedationService/recommedation.service';
import { StaticRecommedationComponent } from './static-recommedation/static-recommedation.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxSpinnerModule } from "ngx-spinner";
import { FilterPipe } from './Pipes/filter.pipe';
import { UpdateStoreComponent } from './pages/admin/update-store/update-store.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    SidebarComponent,
    WelcomeAdminComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ContainerComponent,
    ProductPageComponent,
    UserdashboardCategoryComponent,
    StoresComponent,
    AddStoresComponent,
    ShopProductsComponent,
    AddProductsComponent,
    SlideRecommedationComponent,
    StaticRecommedationComponent,
    HomePageComponent,
    FilterPipe,
    UpdateStoreComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxPaginationModule,
    MatGridListModule,
    NgxSpinnerModule


  ],
  providers: [ProductDataService,ParticularProductDetailService,RecommedationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
