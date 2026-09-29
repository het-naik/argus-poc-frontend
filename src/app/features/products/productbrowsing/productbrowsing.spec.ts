import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Productbrowsing } from './productbrowsing';

describe('Productbrowsing', () => {
  let component: Productbrowsing;
  let fixture: ComponentFixture<Productbrowsing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productbrowsing],
    }).compileComponents();

    fixture = TestBed.createComponent(Productbrowsing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
