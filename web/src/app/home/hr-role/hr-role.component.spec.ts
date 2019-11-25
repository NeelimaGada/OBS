import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRoleComponent } from './hr-role.component';

describe('HrRoleComponent', () => {
  let component: HrRoleComponent;
  let fixture: ComponentFixture<HrRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
