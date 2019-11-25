import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcarrersComponent } from './ucarrers.component';

describe('UcarrersComponent', () => {
  let component: UcarrersComponent;
  let fixture: ComponentFixture<UcarrersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcarrersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcarrersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
