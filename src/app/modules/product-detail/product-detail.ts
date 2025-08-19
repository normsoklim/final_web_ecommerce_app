import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { ToKHRPipe } from "../../shared/pipes/pipes";
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
declare const Swal: any; // Assuming Swal is globally available
declare const axios: any;
declare const $: any;
@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, ToKHRPipe, RouterLink, NgStyle, NgClass, NgFor],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail {

  constructor(private route: ActivatedRoute, public cartService: CartService) { }
  product: any = {};
  ngOnInit(): void {
    const product_id: string | null = this.route.snapshot.queryParamMap.get('product_id');
    let ng_this = this;
    $.LoadingOverlay("show");
    // Make a request for a user with a given ID
    axios.get(`https://fakestoreapi.com/products/${product_id}`)
      .then(function (response: any) {
        // handle success
        ng_this.product = response.data;
        console.log(ng_this.product)
        $.LoadingOverlay("hide");
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
  }
  // Add to cart function
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
  lensStyle: any = {};
  zoomImage(event: MouseEvent) {
    const img = this.productImg.nativeElement;
    const rect = img.getBoundingClientRect();

    // Mouse position relative to image
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Keep lens inside image
    const lensWidth = 120;
    const lensHeight = 120;
    x = Math.max(lensWidth / 2, Math.min(x, rect.width - lensWidth / 2));
    y = Math.max(lensHeight / 2, Math.min(y, rect.height - lensHeight / 2));

    // Percentage positions
    const xPercent = x / rect.width * 100;
    const yPercent = y / rect.height * 100;

    this.lensStyle = {
      display: 'block',
      top: `${y - lensHeight / 2}px`,
      left: `${x - lensWidth / 2}px`,
      backgroundImage: `url(${this.product.image})`,
      backgroundSize: `${rect.width * 2}px ${rect.height * 2}px`,
      backgroundPosition: `${-xPercent * 2 + 50}% ${-yPercent * 2 + 50}%`
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
