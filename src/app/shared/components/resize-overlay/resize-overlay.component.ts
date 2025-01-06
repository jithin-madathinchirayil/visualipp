import { AfterViewInit, Component, ElementRef, input, InputSignal, output, OutputEmitterRef, Signal, viewChild } from '@angular/core';
import { IResize } from '@core/interfaces/app.interface';

@Component({
  selector: 'app-resize-overlay',
  standalone: true,
  imports: [],
  templateUrl: './resize-overlay.component.html',
  styleUrl: './resize-overlay.component.scss',
  host:{
    class: 'w-full h-full border border-dashed border-gray-200 absolute top-0 right-0 z-20',
  }
})
export class ResizeOverlayComponent implements AfterViewInit {
  public onResize: OutputEmitterRef<IResize> = output<any>();
  public id: InputSignal<string | undefined> = input<string | undefined>(undefined);
  private container: Signal<ElementRef<any> | undefined> = viewChild<ElementRef>("container");
  private rightHandle: Signal<ElementRef<any> | undefined> = viewChild<ElementRef>("rightHandle");
  private leftHandle: Signal<ElementRef<any> | undefined> = viewChild<ElementRef>("leftHandle");
  private topHandle: Signal<ElementRef<any> | undefined> = viewChild<ElementRef>("topHandle");
  private bottomHandle: Signal<ElementRef<any> | undefined> = viewChild<ElementRef>("bottomHandle");

  ngAfterViewInit(): void {
    this.pointerDrag(this.leftHandle()?.nativeElement);
  }

  private pointerDrag(el: HTMLElement | undefined): void {
    if(!el) return;
    const move = (ev: PointerEvent) => {
      const newLeft = el.offsetLeft + ev.movementX;
      const containerRect = el.parentElement?.getBoundingClientRect();
      if (containerRect) {
        const maxLeft = containerRect.right - el.offsetWidth;
        const minLeft = containerRect.left;
    
        //el.style.left = `${Math.max(minLeft, Math.min(newLeft, maxLeft))}px`;
      }
     //el.style.left = `${el.offsetLeft + ev.movementX}px`;

    };
    const dragStart = (ev: PointerEvent) => el.setPointerCapture(ev.pointerId);
    const drag = (ev: PointerEvent) => {
      if(el.hasPointerCapture(ev.pointerId)) {
        move(ev);
      }
    };
    const dragEnd = (ev: PointerEvent) => el.releasePointerCapture(ev.pointerId);
    el.addEventListener('pointerdown', dragStart);
    el.addEventListener("pointermove", drag);
    el.addEventListener("pointerup", dragEnd);
  }
}
