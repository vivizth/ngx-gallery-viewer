import { OverlayRef } from '@angular/cdk/overlay';
import { Component, ElementRef, HostListener, Inject, InjectionToken, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

export interface ImageFile {
  base64: string;
  dataURL?: string;
}

export interface GalleryData {
  files: ImageFile[];
  index: number;
}

@Component({
  selector: 'ngx-gallery-viewer',
  templateUrl: 'viewer.component.html',
  styleUrls: ['viewer.component.scss']
})
export class NgxGalleryViewerComponent implements OnInit {

  @ViewChildren('thumbnail') thumbnail: QueryList<ElementRef<HTMLElement>>;

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  constructor(@Inject(CONTAINER_DATA) public data = { files: [], index: 0 } as GalleryData, private overlay: OverlayRef) { }

  ngOnInit(): void {
    if (this.data && this.data.files && this.data.files.length) {
      this.data.files = this.data.files.map(f => {
        return {...f, dataURL: this.toDataURL(f.base64)};
      });
    }
    setTimeout(() => {
      this.select(this.data.index);
    }, 100);
  }

  select(index: number) {
    const lastImage = this.data.files.length - 1;
    index = index < 0 ? lastImage : index;
    index = index > lastImage ? 0 : index;
    this.data.index = index;

    const thumbnail = this.thumbnail.toArray()[index];
    if (thumbnail && thumbnail.nativeElement) {
      thumbnail.nativeElement.scrollIntoView();
    }
  }

  next() {
    this.select(this.data.index + 1);
  }

  prev() {
    this.select(this.data.index - 1);
  }

  close() {
    this.overlay.dispose();
  }

  clickBackdrop(event: any) {
    const target = event.target || event.srcElement || event.currentTarget || {};
    const isBackdrop = target.className === 'big-wrap';
    if (isBackdrop) {
      this.close();
    }
  }

  toDataURL(base64: string) {
    return 'data:image/png;base64,' + base64;
  }

}
