import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceEditorComponent } from './resource-editor.component';

describe('ResourceViewerComponent', () => {
  let component: ResourceEditorComponent;
  let fixture: ComponentFixture<ResourceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
