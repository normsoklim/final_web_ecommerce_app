import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToKHRPipe } from '../../shared/pipes/pipes';
import { CartService } from '../../services/cart-service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  imports: [CurrencyPipe, NgFor, ToKHRPipe,NgIf],
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.css']
})
export class Confirmation {
  selectedItems: any[] = [];
  total: number = 0;
  paymentInfo: any = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
  this.selectedItems = this.cartService.getSelectedItems();
  this.total = this.cartService.getCartTotal();

 this.paymentInfo = this.cartService.getPaymentInfo();

}

  confirmOrder(): void {
    if (this.selectedItems.length === 0) {
      alert('No items in your order!');
      return;
    }

    alert('Order Confirmed!');

    // Clear cart
    this.cartService.clearCart();

    // Navigate to thank-you page
    this.router.navigate(['/thank-you']);
  }
}
