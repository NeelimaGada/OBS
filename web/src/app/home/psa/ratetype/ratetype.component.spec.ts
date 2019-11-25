import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatetypeComponent } from './ratetype.component';

describe('RatetypeComponent', () => {
  let component: RatetypeComponent;
  let fixture: ComponentFixture<RatetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
