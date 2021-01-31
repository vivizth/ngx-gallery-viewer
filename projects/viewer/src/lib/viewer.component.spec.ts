import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGalleryViewerComponent } from './viewer.component';

describe('ViewerComponent', () => {
  let component: NgxGalleryViewerComponent;
  let fixture: ComponentFixture<NgxGalleryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxGalleryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGalleryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
