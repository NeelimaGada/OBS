import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionownerComponent } from './actionowner.component';

describe('ActionownerComponent', () => {
  let component: ActionownerComponent;
  let fixture: ComponentFixture<ActionownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
