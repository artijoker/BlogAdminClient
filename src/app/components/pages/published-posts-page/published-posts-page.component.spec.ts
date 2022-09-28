import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedPostsPageComponent } from './published-posts-page.component';

describe('PublishedPostsPageComponent', () => {
  let component: PublishedPostsPageComponent;
  let fixture: ComponentFixture<PublishedPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedPostsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
