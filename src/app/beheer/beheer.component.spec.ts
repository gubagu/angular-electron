import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeheerComponent } from './beheer.component';

describe('BeheerComponent', () => {
  let component: BeheerComponent;
  let fixture: ComponentFixture<BeheerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeheerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeheerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
