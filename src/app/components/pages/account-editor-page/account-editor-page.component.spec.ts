import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditorPageComponent } from './account-editor-page.component';

describe('AccountEditorComponent', () => {
  let component: AccountEditorPageComponent;
  let fixture: ComponentFixture<AccountEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountEditorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
