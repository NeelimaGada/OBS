import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SarstatusComponent } from './sarstatus.component';

describe('SarstatusComponent', () => {
  let component: SarstatusComponent;
  let fixture: ComponentFixture<SarstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SarstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SarstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
