import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoggerComponent } from './Logger.component';

describe('LoggerComponent', () => {
  let component: LoggerComponent;
  let fixture: ComponentFixture<LoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggerComponent ],
      imports: [ ReactiveFormsModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled', () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should not have a valid form when fields are empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
});
