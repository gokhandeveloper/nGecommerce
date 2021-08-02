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
import { CheckOutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { TopWarningComponent } from './warning/top-warning/top-warning.component';
import { ProductCategoryComponent } from './navigation/product-category/product-category.component';
import { LoggedInNavigationComponent } from './navigation/loggedin-navigation/logged-in-navigation.component';
import {DropdownDirective} from "./navigation/dropdown.directive";
import {LoginService} from "./services/login/LoginService";
import { AuthguardComponent } from './services/authguard/authguard.component';
import {UserService} from "./services/user/user.service";
import {AdminGuard} from "./services/authguard/AdminGuard";
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {FormsModule} from "@angular/forms";
import {ProductCategoryServiceService} from "./services/product-category-service.service";
import {ProductService} from "./services/product.service";
import {ForbiddenValidatorDirective} from "./admin/shared/forbidden-name.directive";
import {AdminCustomProductsComponent} from "./admin/admin-custom-products/admin-custom-products.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import {ShoppingCart} from "../models/ShoppingCart";
import { FooterComponentComponent } from './footer/footer-component/footer-component.component';
import {OrderService} from "./services/order/order.service";
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import {CoinbaseCommerceService} from "./services/payment/coinbase-commerce-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CoinbaseCredentials} from "./services/payment/coinbaseCredentials";
import { PaymentComponentCoinbaseComponent } from './payments/cryptocurrency/coinbase/payment-component-coinbase/payment-component-coinbase.component';
import { PaymentComponentComponent } from './payments/payment-component/payment-component.component';

const routes = [
  {path: '', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},

  {path: 'check-out', component: CheckOutComponent},
  {path: 'my-orders', component: MyOrdersComponent, canActivate : [AuthguardComponent]},
  {path: 'order-success/:id', component: OrderSuccessComponent},

  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthguardComponent, AdminGuard]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthguardComponent, AdminGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthguardComponent, AdminGuard]},

  {path: 'admin/custom-blind-products', component: AdminCustomProductsComponent},

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
    CheckOutComponent,
    LoginComponent,
    TopWarningComponent,
    ProductCategoryComponent,
    LoggedInNavigationComponent,
    DropdownDirective,
    AuthguardComponent,
    ProductFormComponent,
    ForbiddenValidatorDirective,
    AdminCustomProductsComponent,
    ProductQuantityComponent,
    FooterComponentComponent,
    ShippingFormComponent,
    PaymentComponentCoinbaseComponent,
    PaymentComponentComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,HttpClientModule

  ],

  providers: [LoginService, AuthguardComponent,
    UserService, AdminGuard,
    ProductCategoryServiceService,
    ProductService,
    OrderService,
    CoinbaseCommerceService, HttpClient, CoinbaseCredentials],
  bootstrap: [AppComponent]
})
export class AppModule { }
