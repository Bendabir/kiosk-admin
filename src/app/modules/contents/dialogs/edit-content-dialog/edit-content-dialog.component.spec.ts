import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentDialogComponent } from './edit-content-dialog.component';

describe('EditContentDialogComponent', () => {
  let component: EditContentDialogComponent;
  let fixture: ComponentFixture<EditContentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
