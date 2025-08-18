import { Injectable } from '@angular/core';
declare const Swal: any;
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {
    let cart: string = localStorage.getItem('cart_item') ?? '[]';
    this.cart_item = JSON.parse(cart);
  }
  private selectedItems: any[] = [];
  private total: number = 0;
  private cart_item: any[] = [

  ];
  addToCart(product: any): void {
    let dpl_index: number = this.cart_item.findIndex(x => x.id == product.id);
    if (dpl_index > -1) {
      this.cart_item[dpl_index].qty++;
      return;
    } else {
      product.qty = 1
      product.is_select = true;
      this.cart_item.push(product);

    }
    localStorage.setItem('cart_item', JSON.stringify(this.cart_item))
  }
  getCartItem() {
    return this.cart_item
  }
  incrementQty(item: any) {
    let index = this.cart_item.findIndex(x => x.id == item.id);
    this.cart_item[index].qty++;
    localStorage.setItem('cart_item', JSON.stringify(this.cart_item))
  }
  decrementQty(item: any) {
    if (item.qty > 1) {
      let index = this.cart_item.findIndex(x => x.id == item.id);
      this.cart_item[index].qty--;
      localStorage.setItem('cart_item', JSON.stringify(this.cart_item))
    }
  }
  removeCartItem(item: any) {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result: any) => {
      if (result.isConfirmed) {

        let index = this.cart_item.findIndex(x => x.id == item.id);
        this.cart_item.splice(index, 1);
        localStorage.setItem('cart_item', JSON.stringify(this.cart_item))

      }
    });

  }
  getCartTotal() {
    let total: number = 0
    this.cart_item.forEach(x => {
      if (x.is_select) {
        total += x.price * x.qty;
      }

    });
    return total;


  }
  selectCartItem(item: any) {
    let index = this.cart_item.findIndex(x => x.id == item.id);
    this.cart_item[index].is_select = !this.cart_item[index].is_select;
    localStorage.setItem('cart_item', JSON.stringify(this.cart_item))
  }
  getSelectedItems() {
    return this.cart_item.filter(x => x.is_select);
  }


  getTotal() {
    return this.total;
  }

  setCheckoutData(items: any[], total: number) {
    this.selectedItems = items;
    this.total = total;
  }
  clearCart(): void {
    this.cart_item = [];
    this.selectedItems = [];
    this.total = 0;
    localStorage.removeItem('cart_item'); // remove from localStorage
  }
  paymentInfo: any = null;

  setPaymentInfo(info: any) {
    this.paymentInfo = info;
  }

  getPaymentInfo() {
    return this.paymentInfo;
  }

}
