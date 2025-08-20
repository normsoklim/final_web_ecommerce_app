import { Injectable } from '@angular/core';
declare const axios: any;
declare const $ : any ;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {
    let ng_this = this;
    $.LoadingOverlay("show");
    // Make a request for a user with a given ID
    axios.get('https://fakestoreapi.com/products')
      .then(function (response: any) {
        // handle success
        ng_this.products = response.data;
          $.LoadingOverlay("hide");
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
  }

  private products: any[] = []

  getProduct() {
    return this.products
  }
  // Get unique categories (as strings)
  getCategories(): string[] {
    const categories: string[] = [];
    this.products.forEach(p => {
      if (!categories.includes(p.category)) {
        categories.push(p.category);
      }
    });
    return categories;
  }

  // Get products by category
  getProductsByCategory(category: string) {
    return this.products.filter(p => p.category === category);
  }
}
