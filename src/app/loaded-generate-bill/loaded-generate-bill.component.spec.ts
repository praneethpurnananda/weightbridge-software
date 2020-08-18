import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedGenerateBillComponent } from './loaded-generate-bill.component';

describe('LoadedGenerateBillComponent', () => {
  let component: LoadedGenerateBillComponent;
  let fixture: ComponentFixture<LoadedGenerateBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadedGenerateBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadedGenerateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
