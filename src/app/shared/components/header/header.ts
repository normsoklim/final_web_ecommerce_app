import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route,RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { ProductService } from '../../../services/product-service';


@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
     constructor(public cartService : CartService, public productService: ProductService ) {
      
     }
      
    
  
  isLoggedIn = false;
  userName = '';
  searchTerm = '';
  

 
}
