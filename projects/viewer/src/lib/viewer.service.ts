import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { CONTAINER_DATA, NgxGalleryViewerComponent, GalleryData} from './viewer.component';

@Injectable({
  providedIn: 'root'
})
export class NgxGalleryViewerService {

  _injector: any;
  _ref: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {
  }

  open(info: GalleryData) {
    const positionStrategy = this.overlay.position()
    .global()
    .centerHorizontally()
    .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
      disposeOnNavigation: true
    });
    this._ref = this.overlay.create(overlayConfig);
    const inject = this.createInjector(info, this._ref);
    const filePreviewPortal = new ComponentPortal(NgxGalleryViewerComponent, null , inject);
    return this._ref.attach(filePreviewPortal);
  }

  close() {
    this._ref.dispose();
  }

  private createInjector(config: any, dialogRef: OverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRef, dialogRef);
    injectionTokens.set(CONTAINER_DATA, config);
    return new PortalInjector(this.injector, injectionTokens);
  }
}
