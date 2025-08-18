import { Component } from '@angular/core';
import { Products } from '../products/products';
import { Slide } from '../slide/slide';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';
@Component({
  selector: 'app-home',
  imports: [Products, Slide],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor (public  cartService : CartService,public productServie : ProductService ){
     
  }
   addToCart(product:any):void { 
     this.cartService.addToCart(product)
   }
  
   
}
