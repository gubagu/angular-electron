import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedComponent } from './combined.component';

describe('CombinedComponent', () => {
  let component: CombinedComponent;
  let fixture: ComponentFixture<CombinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
