import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermstatusComponent } from './permstatus.component';

describe('PermstatusComponent', () => {
  let component: PermstatusComponent;
  let fixture: ComponentFixture<PermstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
