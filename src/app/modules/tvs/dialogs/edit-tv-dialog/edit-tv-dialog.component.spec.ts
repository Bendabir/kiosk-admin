import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTVDialogComponent } from './edit-tv-dialog.component';

describe('EditTVDialogComponent', () => {
  let component: EditTVDialogComponent;
  let fixture: ComponentFixture<EditTVDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTVDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTVDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
