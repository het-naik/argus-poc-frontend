import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductEditDialog } from './product-edit-dialog';

describe('ProductEditDialog', () => {
  let component: ProductEditDialog;
  let fixture: ComponentFixture<ProductEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
