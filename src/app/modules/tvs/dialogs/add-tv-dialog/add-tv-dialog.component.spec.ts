import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTVDialogComponent } from './add-tv-dialog.component';

describe('AddTVDialogComponent', () => {
  let component: AddTVDialogComponent;
  let fixture: ComponentFixture<AddTVDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTVDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTVDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
