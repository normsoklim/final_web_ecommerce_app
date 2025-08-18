import { Component ,EventEmitter,Input,Output} from '@angular/core';
import { ToKHRPipe } from '../../shared/pipes/pipes';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-products',
  imports: [ToKHRPipe, CurrencyPipe,NgFor,NgClass,RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
 
  @Input() product: any;
  @Output() onAddToCart: any = new EventEmitter<any>();
    
  addToCart(product:any):void {
    
    this.onAddToCart.emit(product)
  }
  getStars(rating: number): string[] {
  const stars: string[] = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }

  if (halfStar) {
    stars.push('half');
  }

  while (stars.length < totalStars) {
    stars.push('empty');
  }

  return stars;
}
  getRatingClass(rating: number): string {
    if (rating >= 4.5) {
      return 'text-success';
    } else if (rating >= 3) {
      return 'text-warning';
    } else {
      return 'text-danger';
    }
  }
}
