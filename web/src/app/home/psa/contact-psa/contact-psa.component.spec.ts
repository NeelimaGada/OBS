import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPSAComponent } from './contact-psa.component';

describe('ContactPSAComponent', () => {
  let component: ContactPSAComponent;
  let fixture: ComponentFixture<ContactPSAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPSAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
