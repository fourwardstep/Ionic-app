import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedPage } from './applied.page';

describe('AppliedPage', () => {
  let component: AppliedPage;
  let fixture: ComponentFixture<AppliedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
