import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewmodeComponent } from './interviewmode.component';

describe('InterviewmodeComponent', () => {
  let component: InterviewmodeComponent;
  let fixture: ComponentFixture<InterviewmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
