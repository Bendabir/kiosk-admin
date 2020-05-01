import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TVsPageComponent } from './tvs-page.component';

describe('TVsPageComponent', () => {
  let component: TVsPageComponent;
  let fixture: ComponentFixture<TVsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TVsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TVsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
