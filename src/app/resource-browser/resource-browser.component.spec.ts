import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceBrowserComponent } from './resource-browser.component';

describe('ResourceBrowserComponent', () => {
  let component: ResourceBrowserComponent;
  let fixture: ComponentFixture<ResourceBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
