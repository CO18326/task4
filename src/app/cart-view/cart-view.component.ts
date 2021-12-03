import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  
  items=this.cartService.getItems();
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });
  constructor(private cartService:CartService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.items = this.cartService.clearCart();
    alert("form submitted");
    this.checkoutForm.reset();
  }

}
