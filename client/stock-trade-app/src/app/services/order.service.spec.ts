import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderResponse } from '../models/order-response.model';
import { environment } from '../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

describe('OrderService', () => {
  let service: OrderService;
 let httpMock: HttpTestingController;
const dummyPayload = { symbol: 'AAPL', quantity: 10 };
  const mockResponse: OrderResponse = {
    isSuccess: true,
    newBalance: 1000,
    errorMessage: ''
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ OrderService ]

    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should send validateOrder POST request and return response', () => {
    service.validateOrder(dummyPayload).subscribe((res) => {
      expect(res.isSuccess).toBeTrue();
      expect(res.newBalance).toBe(1000);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/orders/validate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyPayload);
    req.flush(mockResponse);
  });

    it('should send placeOrder POST request and return response', () => {
    service.placeOrder(dummyPayload).subscribe((res) => {
      expect(res.isSuccess).toBeTrue();
      expect(res.newBalance).toBe(1000);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/orders/execute`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyPayload);
    req.flush(mockResponse);
  });


});
