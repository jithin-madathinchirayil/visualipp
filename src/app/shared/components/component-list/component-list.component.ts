import { Component, input, InputSignal } from '@angular/core';
import { LayoutColumn } from '@core/types/app.types';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComponentModelComponent } from '@shared/components/component-model/component-model.component';

@Component({
  selector: 'app-component-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    ComponentModelComponent,
    ],
  templateUrl: './component-list.component.html',
  styleUrl: './component-list.component.scss',
  host: {
    class:"w-full h-auto flex flex-wrap"
  }
})
export class ComponentListComponent {
  public items: InputSignal<LayoutColumn[]> = input<LayoutColumn[]>([]);
  public connectedList: InputSignal<string[]> = input<string[]>([]);
}
