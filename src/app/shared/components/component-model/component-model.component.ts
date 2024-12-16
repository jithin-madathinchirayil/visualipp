import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, effect, HostListener, input, InputSignal, OnInit, output } from '@angular/core';
import { SafeHtmlPipe } from '@core/pipes/safe-html.pipe';
import { LayoutColumn } from '@core/types/app.types';
import { v4 } from 'uuid';

@Component({
  selector: 'app-component-model',
  standalone: true,
  imports: [
    SafeHtmlPipe,
    CdkDrag
  ],
  templateUrl: './component-model.component.html',
  styleUrl: './component-model.component.scss',
  host:{
    class:"w-full h-auto group flex flex-wrap gap-1 border hover:shadow cursor-pointer border-gray-100 p-2 hover:text-secondary-default text-gray-500"
  }
})
export class ComponentModelComponent {
  public dragStart = output<DragEvent>({alias:"onDragStart"});
  @HostListener('dragstart',['$event']) onDragStart(e: DragEvent) {
    e.dataTransfer?.setData('text',JSON.stringify(this.componentData()));
    this.dragStart.emit(e);
  }
  public componentData: InputSignal<LayoutColumn | undefined> = input<LayoutColumn | undefined>(undefined,{alias:'data'});

  constructor() {
    this.onInputChanges();
  }


  private onInputChanges(): void {
    effect(() => {
      if(!this.componentData()?.content) return;
      this.componentData()!.content!.uid = v4();
    })
  }
  
  public genArray(value: number): number[] {
    return Array.from({ length: value }, (_, index) => index);
  }
}
