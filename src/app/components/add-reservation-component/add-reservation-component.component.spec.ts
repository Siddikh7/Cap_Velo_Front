import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationComponentComponent } from './add-reservation-component.component';

describe('AddReservationComponentComponent', () => {
  let component: AddReservationComponentComponent;
  let fixture: ComponentFixture<AddReservationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReservationComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddReservationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
