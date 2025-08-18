import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';
import { Products } from "../products/products";

@Component({
  selector: 'app-product-page',
  imports: [Products],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {
  constructor(public cartService: CartService, public productServie: ProductService) { }

  addToCart(product: any): void {
    this.cartService.addToCart(product)
  }
}
