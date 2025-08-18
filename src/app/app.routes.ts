import { Routes } from '@angular/router';
import { Home } from './modules/home/home';
import { Cart } from './modules/cart/cart';
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';
import { Contact } from './modules/contact/contact';
import { Products } from './modules/products/products';
import { ProductDetail } from './modules/product-detail/product-detail';
import { CheckOut } from './modules/check-out/check-out';
import { ProductPage } from './modules/product-page/product-page';
import { Payment } from './modules/payment/payment';
import { Confirmation } from './modules/confirmation/confirmation';



export const routes: Routes = [
    {
        path: '',
        component:Home
    },
    {
        path:'cart',
        component:Cart
    },
    {
        path:'login',
        component:Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path:'contact',
        component:Contact
    },
    {
        path:'product',
        component:Products
    },
    {
        path:'product-detail',
        component:ProductDetail
    },{
        path:'check-out',
        component:CheckOut
    },
    {
        path:'product-page',
        component:ProductPage
    },
    {
        path:'payment',
        component:Payment
    },
    {
        path:'confirmation',
        component:Confirmation
    }


];
