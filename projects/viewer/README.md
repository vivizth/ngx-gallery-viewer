# Guide

Simple gallery viewer for angular.

![](screenshot.gif)

# Usage

```bash
// app.module
import { ViewerModule } from 'ngx-gallery-viewer';
@NgModule({
  imports: [
    ViewerModule
  ]
})

// app.component
import { NgxGalleryViewerService } from 'ngx-gallery-viewer';

constructor(gallery: NgxGalleryViewerService)
const images = [
    { base64: '...' },
    { base64: '...' },
    { base64: '...' }
]

gallery.open({
    files: images,
    index: 0
});

```
