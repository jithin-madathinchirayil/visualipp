import { AfterViewInit, ComponentRef, Directive, inject, input, InputSignal, ViewContainerRef } from '@angular/core';
import { ResizeOverlayComponent } from '@shared/components/resize-overlay/resize-overlay.component';

@Directive({
  selector: '[IResize]',
  standalone: true
})
export class IResizeDirective implements AfterViewInit {
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  public enableResize: InputSignal<boolean> = input<boolean>(true,{alias:"enableResize"});

  ngAfterViewInit(): void {
    if (this.enableResize()) {
      const componentRef: ComponentRef<ResizeOverlayComponent> = this.viewContainerRef.createComponent(ResizeOverlayComponent);
    }
  }
}
