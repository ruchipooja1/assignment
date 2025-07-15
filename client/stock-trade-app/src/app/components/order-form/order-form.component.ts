import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { OrderResponse } from '../../models/order-response.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  orderStatus: string | null = null;
   showConfirm = false;
   stockPrice = 180;
   newBalance: number = 0 ;

 constructor(private fb: FormBuilder, private orderService: OrderService) {}

  public ngOnDestroy(): void {

    this.orderForm?.reset();
    this.orderStatus = null;
    this.showConfirm = false;
    this.newBalance = 0;
  }

public ngOnInit(): void {
  this.orderStatus = null;
    this.orderForm = this.fb.group({
      symbol: ['APPL', Validators.required],  
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
  }

  public get totalCost(): number{
    const qty = this.orderForm.get('quantity')?.value || 0; 
      return qty * this.stockPrice;
    
  }

  public submitOrder(): void {
    if (this.orderForm.valid) {
      const payload = this.orderForm.value;

      this.orderService.validateOrder(payload).subscribe({
          next: (res : OrderResponse ) => {
  
       console.log('Sending payload:', payload);
         console.log('Sending response:', res);
     if (res.isSuccess) {
    this.placeFinalOrder(payload);
  } else {
    this.orderStatus = res.errorMessage || 'Validation failed.';
    this.showConfirm = false; // Hide confirmation if validation fails
  }

  },
  error: (err) => {
    this.orderStatus = err.error?.errorMessage || 'Validation service failed. Please try again.';
  }   
    });
  }

}

public cancelOrder():void{
this.showConfirm = false;
this.orderForm.reset();
this.orderStatus = null;
this.newBalance = 0;
  this.orderForm.get('symbol')?.setValue('AAPL'); // Reset to default symbol
  this.orderForm.get('quantity')?.setValue(null); // Reset quantity
}

  public placeFinalOrder(payload: any) : void{
 this.orderService.placeOrder(payload).subscribe({
        next: (res : OrderResponse) => {
          if(res.isSuccess){
          this.orderStatus = 'Order placed successfully!';
            this.newBalance = res.newBalance;

          }else {
            this.orderStatus = res.errorMessage || 'Something went wrong.';
       }

        },
        error: (err) => {
          this.orderStatus = 'Order failed. Please try again.';
        }
      });
  }

}
