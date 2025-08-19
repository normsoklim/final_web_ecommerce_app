import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route,Router,RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { ProductService } from '../../../services/product-service';


@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink,NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  router: any;

     constructor(public cartService : CartService, public productService: ProductService, router: Router) {
       this.router = router;
     }
      
    
   isMenuOpen = false;
  isLoggedIn = false;
  userName = '';
  searchTerm = '';
   toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onSearch(query: string) {
  if (!query.trim()) return;
  this.router.navigate(['/search'], { queryParams: { q: query } });
  this.toggleMenu();
}


 
}
