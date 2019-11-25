import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SezlocationComponent } from './sezlocation.component';

describe('SezlocationComponent', () => {
  let component: SezlocationComponent;
  let fixture: ComponentFixture<SezlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SezlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SezlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
