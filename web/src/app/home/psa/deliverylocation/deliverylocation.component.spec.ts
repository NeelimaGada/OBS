import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverylocationComponent } from './deliverylocation.component';

describe('DeliverylocationComponent', () => {
  let component: DeliverylocationComponent;
  let fixture: ComponentFixture<DeliverylocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverylocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverylocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
