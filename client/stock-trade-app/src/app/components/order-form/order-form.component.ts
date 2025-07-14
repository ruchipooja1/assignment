import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  orderStatus: string | null = null;
   showConfirm = false;
   stockPrice = 180;

 constructor(private fb: FormBuilder, private orderService: OrderService) {}
 
public ngOnInit(): void {
    this.orderForm = this.fb.group({
      symbol: ['AAPL', Validators.required],  // Hidden or read-only if Apple is the only option
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
      this.orderService.placeOrder(payload).subscribe({
        next: (res) => {
          this.orderStatus = 'Order placed successfully!';
        },
        error: (err) => {
          this.orderStatus = 'Order failed. Please try again.';
        }
      });
    }
  }


}
