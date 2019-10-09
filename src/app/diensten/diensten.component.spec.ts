import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstenComponent } from './diensten.component';

describe('DienstenComponent', () => {
  let component: DienstenComponent;
  let fixture: ComponentFixture<DienstenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
