import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttechstackComponent } from './projecttechstack.component';

describe('ProjecttechstackComponent', () => {
  let component: ProjecttechstackComponent;
  let fixture: ComponentFixture<ProjecttechstackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjecttechstackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecttechstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
