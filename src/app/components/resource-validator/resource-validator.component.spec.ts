import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceValidatorComponent } from './resource-validator.component';

describe('ResourceValidatorComponent', () => {
  let component: ResourceValidatorComponent;
  let fixture: ComponentFixture<ResourceValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
