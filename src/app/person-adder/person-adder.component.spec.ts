import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonAdderComponent } from './person-adder.component';

describe('PersonAdderComponent', () => {
  let component: PersonAdderComponent;
  let fixture: ComponentFixture<PersonAdderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
