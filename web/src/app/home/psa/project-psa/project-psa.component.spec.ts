import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPSAComponent } from './project-psa.component';

describe('ProjectPSAComponent', () => {
  let component: ProjectPSAComponent;
  let fixture: ComponentFixture<ProjectPSAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPSAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
