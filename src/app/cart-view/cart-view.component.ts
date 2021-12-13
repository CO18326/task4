import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormGroup,FormBuilder,Validators , ValidatorFn,ValidationErrors,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  
  items=this.cartService.getItems();
  checkoutForm = this.formBuilder.group({
    name:  ['',this.Validator(/^[a-zA-Z]+\s{0,1}[a-zA-Z]+$/) ],
    email: ['',this.Validator(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)],
    address: ''
  });
  constructor(private cartService:CartService,private formBuilder:FormBuilder) {
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.items = this.cartService.clearCart();
    if(this.checkoutForm.controls['name'].errors?.['forbiddenName'] || this.checkoutForm.controls['email'].errors?.['forbiddenName'] ){
      alert("there is error in form")
    }
    else{
    alert("form submitted");
    this.checkoutForm.reset();
    }
  }

  Validator(regex:RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !(regex.test(control.value));
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
