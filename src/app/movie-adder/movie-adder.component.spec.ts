import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieAdderComponent } from './movie-adder.component';

describe('MovieAdderComponent', () => {
  let component: MovieAdderComponent;
  let fixture: ComponentFixture<MovieAdderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
