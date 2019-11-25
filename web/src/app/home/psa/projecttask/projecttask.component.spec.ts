import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttaskComponent } from './projecttask.component';

describe('ProjecttaskComponent', () => {
  let component: ProjecttaskComponent;
  let fixture: ComponentFixture<ProjecttaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjecttaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
