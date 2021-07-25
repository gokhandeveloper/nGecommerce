import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {RouterModule} from "@angular/router";
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { TopWarningComponent } from './warning/top-warning/top-warning.component';
import { ProductCategoryComponent } from './navigation/product-category/product-category.component';
import { LoggedinNavigationComponent } from './navigation/loggedin-navigation/loggedin-navigation.component';
import {DropdownDirective} from "./navigation/dropdown.directive";
import {LoginService} from "./services/login/LoginService";
import { AuthguardComponent } from './services/authguard/authguard.component';
import {UserService} from "./services/user/user.service";
import {AdminGuard} from "./services/authguard/AdminGuard";
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {FormsModule} from "@angular/forms";
import {ProductCategoryServiceService} from "./services/product-category-service.service";
import {ProductServiceService} from "./services/product-service.service";
import {ForbiddenValidatorDirective} from "./admin/shared/forbidden-name.directive";


const routes = [
  {path: '', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},

  {path: 'check-out', component: CheckoutComponent},
  {path: 'my-orders', component: MyOrdersComponent, canActivate : [AuthguardComponent]},
  {path: 'order-success', component: OrderSuccessComponent},

  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthguardComponent, AdminGuard]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthguardComponent, AdminGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthguardComponent, AdminGuard]},

  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthguardComponent, AdminGuard]}

];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    CheckoutComponent,
    LoginComponent,
    TopWarningComponent,
    ProductCategoryComponent,
    LoggedinNavigationComponent,
    DropdownDirective,
    AuthguardComponent,
    ProductFormComponent,
    ForbiddenValidatorDirective
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    FormsModule

  ],

  providers: [LoginService, AuthguardComponent, UserService, AdminGuard, ProductCategoryServiceService, ProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
