import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IElement } from '@core/interfaces/app.interface';

@Component({
  selector: 'app-html-element',
  standalone: true,
  imports: [
    MatIconModule,
    CdkDrag
  ],
  templateUrl: './html-element.component.html',
  styleUrl: './html-element.component.scss',
  host:{class:'w-full h-20 border rounded hover:shadow transition-all duration-300 cursor-pointer flex flex-col content-center items-center justify-center gap-2'}
})
export class HtmlElementComponent {
  @Input() data: IElement | undefined;
  @Output() dragStart: EventEmitter<DragEvent> = new EventEmitter(true);
  @HostListener('dragstart',['$event']) onDragStart(e: DragEvent) {
    e.dataTransfer?.setData('text',JSON.stringify(this.data));
    this.dragStart.emit(e);
  }
}
