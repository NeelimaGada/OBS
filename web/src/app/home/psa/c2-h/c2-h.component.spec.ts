import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C2HComponent } from './c2-h.component';

describe('C2HComponent', () => {
  let component: C2HComponent;
  let fixture: ComponentFixture<C2HComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C2HComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C2HComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
