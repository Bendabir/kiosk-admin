import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TVCardComponent } from './tv-card.component';

describe('TVCardComponent', () => {
  let component: TVCardComponent;
  let fixture: ComponentFixture<TVCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TVCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TVCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
