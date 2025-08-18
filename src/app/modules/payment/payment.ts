import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToKHRPipe } from "../../shared/pipes/pipes";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var Swal: any; // Declare Swal globally for SweetAlert2 usage
@Component({
  selector: 'app-payment',
  imports: [CurrencyPipe, NgFor, RouterLink, ToKHRPipe],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {
  paymentForm!: FormGroup;
  submittedPayment: any = null; // store submitted form data
  selectedItems: any[] = [];
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize form with validators
    this.paymentForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expiry: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
    });

    // Get cart items and total
    this.selectedItems = this.cartService.getSelectedItems();
    this.total = this.cartService.getTotal();
  }

  payNow(): void {
    if (this.paymentForm.invalid) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your payment has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.cartService.setPaymentInfo(this.paymentForm.value);
    this.router.navigate(['/confirmation']);

  }


}
