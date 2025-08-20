import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { ToKHRPipe } from "../../shared/pipes/pipes";
import { CartService } from '../../services/cart-service';
declare const Swal: any;
declare const axios: any;
declare const $: any;
@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, ToKHRPipe, NgStyle, NgClass, NgFor, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  constructor(private route: ActivatedRoute, public cartService: CartService) { }
  product: any = {};
  ngOnInit(): void {
    const product_id: string | null = this.route.snapshot.queryParamMap.get('product_id');
    let ng_this = this;

    axios.get(`https://fakestoreapi.com/products/${product_id}`)
      .then(function (response: any) {
        // handle success
        ng_this.product = response.data;
        console.log(ng_this.product)

      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
  }

  addToCart() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result: { isConfirmed: any; dismiss: any; }) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Add to Cart!",
          text: "Your item has been added to the cart.",
          icon: "success"

        });
        this.cartService.addToCart(this.product);
      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item is safe :)",
          icon: "error"
        });
      }
    });
  }

  @ViewChild('productImg') productImg!: ElementRef<HTMLImageElement>;
  lensStyle = {};

  zoomImage(event: MouseEvent) {
    const img = (event.target as HTMLImageElement);
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.lensStyle = {
      display: 'block',
      left: `${x - 60}px`,
      top: `${y - 60}px`,
      backgroundImage: `url(${this.product.image})`,
      backgroundSize: `${img.width * 2}px ${img.height * 2}px`,
      backgroundPosition: `-${x * 2 - 60}px -${y * 2 - 60}px`
    };
  }

  resetZoom() {
    this.lensStyle = { display: 'none' };
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
