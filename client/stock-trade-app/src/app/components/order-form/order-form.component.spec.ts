import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormComponent } from './order-form.component';
import { OrderService } from '../../services/order.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OrderResponse } from '../../models/order-response.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    orderServiceSpy= jasmine.createSpyObj('OrderService', ['placeOrder', 'validateOrder']);

    await TestBed.configureTestingModule({
      imports: [OrderFormComponent,ReactiveFormsModule],
      declarations:[ ],
      providers :[{ provide: OrderService, useValue: orderServiceSpy} , FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize orderForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.orderForm).toBeDefined();
    expect(component.orderForm.get('symbol')?.value).toBe('APPL');
    expect(component.orderForm.get('quantity')?.value).toBeNull();
  });

  it('should reset form on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.orderForm.value).toEqual({ symbol: null, quantity: null });
    expect(component.orderStatus).toBeNull();
    expect(component.showConfirm).toBeFalse();
    expect(component.newBalance).toBe(0);
  });

  it('should calculate totalCost correctly', () => {
    component.orderForm.setValue({ symbol: 'APPL', quantity: 2 });
    expect(component.totalCost).toBe(360); // 2 * 180
  });

it('should handle successful order submission and placement', () => {
    const mockResponse: OrderResponse = { isSuccess: true, newBalance: 500, errorMessage: '' };
    orderServiceSpy.validateOrder.and.returnValue(of(mockResponse));
    orderServiceSpy.placeOrder.and.returnValue(of(mockResponse));
    component.orderForm.get('quantity')?.setValue(1);

    component.submitOrder();
    expect(orderServiceSpy.validateOrder).toHaveBeenCalled();
    expect(orderServiceSpy.placeOrder).toHaveBeenCalled();
    expect(component.orderStatus).toBe('Order placed successfully!');

  });

});
