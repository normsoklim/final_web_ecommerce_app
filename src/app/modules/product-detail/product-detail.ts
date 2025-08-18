import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { ToKHRPipe } from "../../shared/pipes/pipes";
import { RouterLink } from '@angular/router';

declare const axios: any;
declare const $ : any ;
@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, ToKHRPipe, RouterLink,NgStyle],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {
  
  constructor(private route:ActivatedRoute){}
  product:any ={};
  ngOnInit():void{
    const product_id: string |null = this.route.snapshot.queryParamMap.get('product_id');
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

  
}
