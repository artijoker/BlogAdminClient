import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPostsPageComponent } from './pending-posts-page.component';

describe('PendingPostsPageComponent', () => {
  let component: PendingPostsPageComponent;
  let fixture: ComponentFixture<PendingPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPostsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
