import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsconditionsPage } from './termsconditions.page';

describe('TermsconditionsPage', () => {
  let component: TermsconditionsPage;
  let fixture: ComponentFixture<TermsconditionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsconditionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsconditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
