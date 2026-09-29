import { TestBed } from '@angular/core/testing';
import { Productservice } from './productservice';

describe('Productservice', () => {
  let service: Productservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Productservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
