import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDeleterComponent } from './movie-deleter.component';

describe('MovieDeleterComponent', () => {
  let component: MovieDeleterComponent;
  let fixture: ComponentFixture<MovieDeleterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDeleterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDeleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
