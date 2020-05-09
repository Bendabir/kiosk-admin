import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsPageComponent } from './contents-page.component';

describe('ContentsPageComponent', () => {
  let component: ContentsPageComponent;
  let fixture: ComponentFixture<ContentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
