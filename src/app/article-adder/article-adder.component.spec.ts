import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticleAdderComponent } from './article-adder.component';

describe('ArticleAdderComponent', () => {
  let component: ArticleAdderComponent;
  let fixture: ComponentFixture<ArticleAdderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
