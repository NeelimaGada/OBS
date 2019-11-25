import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiontypeComponent } from './actiontype.component';

describe('ActiontypeComponent', () => {
  let component: ActiontypeComponent;
  let fixture: ComponentFixture<ActiontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
