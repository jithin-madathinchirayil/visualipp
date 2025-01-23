import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IElement, IPageSchema } from '@core/interfaces/app.interface';
import { WireService } from '@core/services/wire.service';

@Component({
  selector: 'app-html-preview',
  standalone: true,
  imports: [
    CdkDropList,
    NgTemplateOutlet,
    NgStyle
  ],
  templateUrl: './html-preview.component.html',
  styleUrl: './html-preview.component.scss',
  host:{
    class:"overflow-y-scroll hide-scrollbar flex flex-wrap content-start relative hover:border hover:border-dashed",
  }
})
export class HtmlPreviewComponent implements OnChanges {
  private wireService: WireService = inject(WireService);
  @Input() page: IPageSchema | undefined;
  @Input() computedStyle: any;
  @Output() onSelect: EventEmitter<IPageSchema> = new EventEmitter<IPageSchema>(true);
  @HostListener('dragover',['$event']) onDragOver(e: DragEvent) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const target = e.target as HTMLElement;
      if(target.classList.contains('overlay')) return;
      target.classList.add('active');
  }
  @HostListener('dragleave', ['$event']) onDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const target = e.target as HTMLElement;
    target.classList.remove('active');
  }
  @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const data: string | undefined = e.dataTransfer?.getData('text');
    if(!data) return;
    const parsedItem = JSON.parse(data) as IElement;
    if(!data) return;
    const target = e.target as HTMLElement;
    const targetId: string | null = target.getAttribute('id');
    if(!targetId) return;
    target.classList.remove('active');
    const newPage: IPageSchema | undefined = this.wireService.getPageSchema({name:parsedItem.name,type:parsedItem.type,controlName:parsedItem.name});
    if(!newPage) return;
    this.page?.child.push(newPage);
  }
  @HostListener('click',['$event']) onClick(e: MouseEvent) {
    e.stopImmediatePropagation();
    this.onSelect.emit(this.page);
  }
  @HostBinding('style.height') get height(): string {
    const autoHeight: boolean = this.computedStyle?.autoHeight;
    const height: number = this.computedStyle?.height ?? 100;
    const heightUnit: string = this.computedStyle?.heightUnit ?? '%';
    if(!autoHeight) return `${height}${heightUnit}`;
    return 'auto' 
  }
  @HostBinding('style.width') get width(): string {
    const autoWidth: boolean = this.computedStyle?.autoWidth;
    const width: number = this.computedStyle?.width ?? 100;
    const widthUnit: string = this.computedStyle?.widthUnit ?? '%';
    if(!autoWidth) return `${width}${widthUnit}`;
    return 'auto'
  }
  @HostBinding('style.background') get background(): string {
    if(this.computedStyle?.backgroundType === 'color') return this.computedStyle.backgroundColor;
    if(this.computedStyle?.backgroundType === 'image') return `url(${this.computedStyle.backgroundImage})`;
    return 'white';
  }
  @HostBinding('style.backgroundSize') get backgroundSize(): string {
    return this.computedStyle?.backgroundSize ?? 'cover';
  }
  @HostBinding('style.backgroundRepeat') get backgroundRepeat(): string {
    return this.computedStyle?.backgroundRepeat ?? 'no-repeat';
  }
  @HostBinding('style.backgroundPosition') get backgroundPosition(): string {
    return this.computedStyle?.backgroundPosition ?? 'center';
  }
  @HostBinding('style.padding') get padding(): string {
    const paddingTop: number = this.computedStyle?.paddingTop ?? 0;
    const paddingBottom: number = this.computedStyle?.paddingBottom ?? 0;
    const paddingLeft: number = this.computedStyle?.paddingLeft ?? 0;
    const paddingRight: number = this.computedStyle?.paddingRight ?? 0;
    const paddingUnit: string = this.computedStyle?.paddingUnit ?? 'px';
    return `${paddingTop}${paddingUnit} ${paddingRight}${paddingUnit} ${paddingBottom}${paddingUnit} ${paddingLeft}${paddingUnit}`;
  }
  @HostBinding('style.margin') get margin(): string {
    const marginTop: number = this.computedStyle?.marginTop ?? 0;
    const marginBottom: number = this.computedStyle?.marginBottom ?? 0;
    const marginLeft: number = this.computedStyle?.marginLeft ?? 0;
    const marginRight: number = this.computedStyle?.marginRight ?? 0;
    const marginUnit: string = this.computedStyle?.marginUnit ?? 'px';
    return `${marginTop}${marginUnit} ${marginRight}${marginUnit} ${marginBottom}${marginUnit} ${marginLeft}${marginUnit}`;
  }
  @HostBinding('style.fontFamily') get fontFamily(): string {
    return this.computedStyle?.fontFamily ?? 'Arial';
  }
  @HostBinding('style.fontWeight') get fontWeight(): string {
    return this.computedStyle?.fontWeight ?? 'normal';
  }
  @HostBinding('style.fontColor') get fontColor(): string {
    return this.computedStyle?.fontColor ?? 'black';
  }
  @HostBinding('style.textDecoration') get textDecoration(): string {
    return this.computedStyle?.textDecoration ?? 'none';
  }
  @HostBinding('style.textTransform') get textTransform(): string {
    return this.computedStyle?.textTransform ?? 'none';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['page']?.currentValue) {
      this.generateClass();
    }
    if(changes['computedStyle']?.currentValue) {
      this.generateClass();
    }
  }

  private generateClass(): void {
    
  }
}
