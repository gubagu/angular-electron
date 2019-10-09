import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramelessComponent } from './frameless.component';

describe('FramelessComponent', () => {
  let component: FramelessComponent;
  let fixture: ComponentFixture<FramelessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramelessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramelessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
