import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TVsComponent } from './tvs.component';

describe('TVsComponent', () => {
  let component: TVsComponent;
  let fixture: ComponentFixture<TVsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TVsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
