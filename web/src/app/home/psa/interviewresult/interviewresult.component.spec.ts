import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewresultComponent } from './interviewresult.component';

describe('InterviewresultComponent', () => {
  let component: InterviewresultComponent;
  let fixture: ComponentFixture<InterviewresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
