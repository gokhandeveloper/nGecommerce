import { TestBed } from '@angular/core/testing';
import {CoinbaseCommerceService} from "./coinbase-commerce-service";


describe('CoinbaseCommerceService', () => {
  let service: CoinbaseCommerceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinbaseCommerceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



});
