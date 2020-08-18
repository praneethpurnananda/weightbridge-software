import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotloadedGenerateBillComponent } from './notloaded-generate-bill.component';

describe('NotloadedGenerateBillComponent', () => {
  let component: NotloadedGenerateBillComponent;
  let fixture: ComponentFixture<NotloadedGenerateBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotloadedGenerateBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotloadedGenerateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
