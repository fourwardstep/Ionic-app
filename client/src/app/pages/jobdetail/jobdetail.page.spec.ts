import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdetailPage } from './jobdetail.page';

describe('JobdetailPage', () => {
  let component: JobdetailPage;
  let fixture: ComponentFixture<JobdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
