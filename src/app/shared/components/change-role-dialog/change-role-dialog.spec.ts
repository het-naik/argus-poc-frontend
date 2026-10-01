import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeRoleDialog } from './change-role-dialog';

describe('ChangeRoleDialog', () => {
  let component: ChangeRoleDialog;
  let fixture: ComponentFixture<ChangeRoleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRoleDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeRoleDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
