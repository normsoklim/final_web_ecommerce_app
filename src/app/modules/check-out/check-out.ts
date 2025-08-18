import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Router,RouterLink } from '@angular/router';


@Component({
  selector: 'app-check-out',
  imports: [CurrencyPipe, NgFor, RouterLink],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css'
})
export class CheckOut {
  selectedItems: any[] = [];
  total: number = 0;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.selectedItems = this.cartService.getSelectedItems();
    this.total = this.selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }
  goToPayment(): void {
    this.cartService.setCheckoutData(this.selectedItems, this.total);
    this.router.navigate(['/payment']);
  }
}