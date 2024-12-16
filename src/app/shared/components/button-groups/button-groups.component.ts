import { Component, effect, input, InputSignal, output } from '@angular/core';
import { SafeHtmlPipe } from '@core/pipes/safe-html.pipe';
import { ButtonGroupItem } from '@core/types/app.types';
import { MatTooltip } from '@angular/material/tooltip'
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button-groups',
  standalone: true,
  imports: [
    NgClass,
    SafeHtmlPipe,
    MatTooltip
  ],
  templateUrl: './button-groups.component.html',
  styleUrl: './button-groups.component.scss',
  host:{
    class:"w-full h-auto flex bg-white text-primary-default border-b border-b-200"
  }
})
export class ButtonGroupsComponent {
  public buttonList: InputSignal<ButtonGroupItem[]> = input<ButtonGroupItem[]>([],{alias:'list'});
  public selectedButton : InputSignal<string | undefined> = input<string | undefined>(undefined);
  public onSelectedButton = output<string | undefined>({alias:'onChange'});

  public selectTab(tab: string | undefined): void {
    if(!tab) return;
    this.onSelectedButton.emit(tab);
  }
}
