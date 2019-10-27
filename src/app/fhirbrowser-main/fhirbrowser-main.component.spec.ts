import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FHIRBrowserMainComponent } from './fhirbrowser-main.component';

describe('FHIRBrowserMainComponent', () => {
  let component: FHIRBrowserMainComponent;
  let fixture: ComponentFixture<FHIRBrowserMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FHIRBrowserMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FHIRBrowserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
