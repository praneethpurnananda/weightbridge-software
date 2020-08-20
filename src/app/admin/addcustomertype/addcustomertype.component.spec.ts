import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomertypeComponent } from './addcustomertype.component';

describe('AddcustomertypeComponent', () => {
  let component: AddcustomertypeComponent;
  let fixture: ComponentFixture<AddcustomertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcustomertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcustomertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
