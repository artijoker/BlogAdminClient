import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryModalWindowComponent } from './category-modal-window.component';

describe('CategoryModalWindowComponent', () => {
  let component: CategoryModalWindowComponent;
  let fixture: ComponentFixture<CategoryModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryModalWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
