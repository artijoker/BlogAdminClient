import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPostsPageComponent } from './draft-posts-page.component';

describe('DraftPostsPageComponent', () => {
  let component: DraftPostsPageComponent;
  let fixture: ComponentFixture<DraftPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftPostsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
