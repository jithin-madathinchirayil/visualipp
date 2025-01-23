import { NgClass } from '@angular/common';
import { Component, HostBinding, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IPageSchema } from '@core/interfaces/app.interface';

@Component({
  selector: 'app-tree-element',
  standalone: true,
  imports: [
    NgClass,
    MatIcon
  ],
  templateUrl: './tree-element.component.html',
  styleUrl: './tree-element.component.scss',
  host:{
    class:'w-full min-h-7 flex flex-wrap relative cursor-pointer',
    '(click)': 'toggleChild($event)'
  }
})
export class TreeElementComponent {
  @Input() page: IPageSchema | undefined;
  @Input() order: number = 0;
  @Input() total: number | undefined = 0;
  @Input() depth: number = 0;
  @HostBinding('class.pl-8') get isFirstElement() { 
    return this.depth === 0 ? true : false;
  }
  @HostBinding('class.pl-4') get isChildElement() { 
    return this.depth !== 0 ? true : false;
  }
  public enableChild: boolean = false;

  public toggleChild(e: MouseEvent): void {
    e.stopImmediatePropagation();
    this.enableChild = !this.enableChild;
  }

  public get FirstMainTreeWithOutEnable(): boolean {
    if(!this.total) return false;
    return this.order === 0 && this.depth === 0 && this.total-1 != this.order && !this.enableChild;
  }

  public get FirstMainTreeWithEnable(): boolean {
    if(!this.total) return false;
    return this.order === 0 && this.depth === 0 && this.total-1 != this.order && this.enableChild;
  }

  public get LastMainTreeWithOutEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth === 0 && this.total-1 === this.order && !this.enableChild;
  }

  public get LastMainTreeWithEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth === 0 && this.total-1 === this.order && this.enableChild;
  }

  public get mainTreeWithOutEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth === 0 && this.total-1 !== this.order && !this.enableChild;
  }

  public get mainTreeWithEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth === 0 && this.total-1 !== this.order && this.enableChild;
  }

  public get FirstChildTreeWithOutEnable(): boolean {
    if(!this.total) return false;
    return this.order === 0 && this.depth !== 0 && this.total-1 != this.order && !this.enableChild;
  }

  public get FirstChildTreeWithEnable(): boolean {
    if(!this.total) return false;
    return this.order === 0 && this.depth !== 0 && this.total-1 != this.order && this.enableChild;
  }

  public get childTreeWithOutEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth !== 0 && this.total-1 !== this.order && !this.enableChild;
  }

  public get childTreeWithEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth !== 0 && this.total-1 !== this.order && this.enableChild;
  }

  public get LastChildTreeWithOutEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth !== 0 && this.total-1 === this.order && !this.enableChild;
  }

  public get LastChildTreeWithEnable(): boolean {
    if(!this.total) return false;
    return this.order != 0 && this.depth !== 0 && this.total-1 === this.order && this.enableChild;
  }
}
