import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxGalleryViewerComponent } from './viewer.component';



@NgModule({
  declarations: [NgxGalleryViewerComponent],
  imports: [
    OverlayModule,
    CommonModule
  ],
  entryComponents: [NgxGalleryViewerComponent],
  exports: [NgxGalleryViewerComponent]
})
export class ViewerModule { }
