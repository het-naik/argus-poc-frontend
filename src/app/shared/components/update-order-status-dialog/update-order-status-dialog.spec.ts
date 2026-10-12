import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateOrderStatusDialog } from './update-order-status-dialog';

describe('UpdateOrderStatusDialog', () => {
  let component: UpdateOrderStatusDialog;
  let fixture: ComponentFixture<UpdateOrderStatusDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrderStatusDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateOrderStatusDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
