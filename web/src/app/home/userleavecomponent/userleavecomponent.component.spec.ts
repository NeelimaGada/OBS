import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserleavecomponentComponent } from './userleavecomponent.component';

describe('UserleavecomponentComponent', () => {
  let component: UserleavecomponentComponent;
  let fixture: ComponentFixture<UserleavecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserleavecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserleavecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
