import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractcompanyComponent } from './contractcompany.component';

describe('ContractcompanyComponent', () => {
  let component: ContractcompanyComponent;
  let fixture: ComponentFixture<ContractcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
