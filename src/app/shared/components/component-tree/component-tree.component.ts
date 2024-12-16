import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { PageSchema } from '@core/models/app.models';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-component-tree',
  standalone: true,
  imports: [
    NgStyle,
    NgTemplateOutlet,
    MatExpansionModule
  ],
  templateUrl: './component-tree.component.html',
  styleUrl: './component-tree.component.scss',
  host:{
    class:"w-full h-auto flex flex-wrap bg-white text-sm"
  }
})
export class ComponentTreeComponent {
  public page: InputSignal<PageSchema | undefined> = input<PageSchema | undefined>(undefined,{alias:'page'});
  public level: InputSignal<number> = input<number>(0, {alias:'level'});
}
