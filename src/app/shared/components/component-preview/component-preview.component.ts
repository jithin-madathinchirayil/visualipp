import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { Component, effect, EffectCleanupRegisterFn, HostBinding, HostListener, inject, input, InputSignal, output } from '@angular/core';
import { PageSchema } from '@core/models/app.models';
import { PageService } from '@core/services/page.service';
import { LayoutColumn } from '@core/types/app.types';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CdkDropList
  ],
  templateUrl: './component-preview.component.html',
  styleUrl: './component-preview.component.scss',
})
export class ComponentPreviewComponent {
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
    const parsedItem = JSON.parse(data);
    if(!data) return;
    const target = e.target as HTMLElement;
    const targetId: string | null = target.getAttribute('id');
    if(!targetId) return;
    target.classList.remove('active');
    this.addPageSchema(parsedItem);
  }
  @HostListener('click') onClick() {
    this.onSelect.emit(this.pageSchema());
  }
  @HostBinding('class') get classListStrings() {
    return this.classList.join(' ');
  }
  @HostBinding('style.backgroundColor') get backgroundColor() {
    return this.pageSchema()?.styleValues.backgroundColor ?? 'white';
  }
  @HostBinding('style.marginTop') get marginTop() {
    return this.pageSchema()?.styleValues.marginTop ? this.pageSchema()?.styleValues.marginTop + this.pageSchema()?.styleValues.marginUnit : null;
  }
  @HostBinding('style.marginBottom') get marginBottom() {
    return this.pageSchema()?.styleValues.marginBottom ? this.pageSchema()?.styleValues.marginBottom + this.pageSchema()?.styleValues.marginUnit : null;
  }
  @HostBinding('style.marginLeft') get marginLeft() {
    return this.pageSchema()?.styleValues.marginLeft ? this.pageSchema()?.styleValues.marginLeft + this.pageSchema()?.styleValues.marginUnit : null;
  }
  @HostBinding('style.marginRight') get marginRight() {
    return this.pageSchema()?.styleValues.marginRight ? this.pageSchema()?.styleValues.marginRight + this.pageSchema()?.styleValues.marginUnit : null;
  }
  @HostBinding('style.paddingTop') get paddingTop() {
    return this.pageSchema()?.styleValues.paddingTop ? this.pageSchema()?.styleValues.paddingTop + this.pageSchema()?.styleValues.paddingUnit : null;
  }
  @HostBinding('style.paddingBottom') get paddingBottom() {
    return this.pageSchema()?.styleValues.paddingBottom ? this.pageSchema()?.styleValues.paddingBottom + this.pageSchema()?.styleValues.paddingUnit : null;
  }
  @HostBinding('style.paddingLeft') get paddingLeft() {
    return this.pageSchema()?.styleValues.paddingLeft ? this.pageSchema()?.styleValues.paddingLeft + this.pageSchema()?.styleValues.paddingUnit : null;
  }
  @HostBinding('style.paddingRight') get paddingRight() {
    return this.pageSchema()?.styleValues.paddingRight ? this.pageSchema()?.styleValues.paddingRight + this.pageSchema()?.styleValues.paddingUnit : null;
  }
  @HostBinding('style.width') get width() {
    return this.pageSchema()?.styleValues.autoWidth ? 'auto' : this.pageSchema()?.styleValues.width + this.pageSchema()?.styleValues.widthUnit ;
  }
  @HostBinding('style.height') get height() {
    return this.pageSchema()?.styleValues.autoHeight ? 'auto' : this.pageSchema()?.styleValues.height + this.pageSchema()?.styleValues.heightUnit;
  }
  private pageService: PageService = inject(PageService);
  public pageSchema: InputSignal<PageSchema | undefined> = input<PageSchema | undefined>(undefined,{alias:"parentItem"});
  public enableBorder: InputSignal<boolean> = input<boolean>(false, {alias:"enableBorder"});
  public hideElement: InputSignal<boolean> = input<boolean>(false, {alias:"hideElement"});
  public onSelect = output<PageSchema | undefined>({alias:'onSelect'});
  private classList: string[] = [];
  constructor(){
    this.onInputChanges();
  }

  private onInputChanges(): void{
    effect((e: EffectCleanupRegisterFn) => {
      if(this.pageSchema()?.type === 'page') {
        this.classList = ["w-full","h-full","flex","flex-wrap","content-start",'cursor-pointer']
      }
      if(this.pageSchema()?.type === 'column') {
        this.classList = ["w-full","min-h-32","flex","content-start","relative",'cursor-pointer','p-2','hover:border-secondary-default']
      }
      if (this.pageSchema()?.type === 'button') {
        this.classList = ["flex","border", "border-gray-300","border-dashed", "relative", 'cursor-pointer', 'hover:border-secondary-default'];
      }
      if (this.pageSchema()?.type === 'text') {
        this.classList = ["w-full", "min-h-10", "border", "border-gray-300", "rounded", "p-2", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500"]
      }
      if (this.pageSchema()?.type === 'input') {
        this.classList = ["w-full", "min-h-10", "border", "border-gray-300", "rounded", "p-2", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500"]
      }
      if (this.pageSchema()?.type === 'image') {
        this.classList = ["w-full", "min-h-10", "border", "border-gray-300", "rounded", "p-2", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500"]
      }
      if (this.pageSchema()?.type === 'link') {
        this.classList = ["w-full", "min-h-10", "border", "border-gray-300", "rounded", "p-2", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500"]
      }
      if(this.enableBorder()) {
        this.classList.push("border","border-dashed");
      } else {
        this.classList = this.classList.filter((item:string) => item !== "border" && item !== "border-invert");
      }
      if(this.hideElement()) {
        this.classList.push("hidden");
      } else {
        this.classList = this.classList.filter((item:string) => item !== "hidden");
      }
    },{allowSignalWrites: true});
  }

  private addPageSchema(item:LayoutColumn) {
    switch(item.type) {
      case 'column': this.pageService.getColumnSchema(item.value as number).forEach((item: PageSchema) => {
        this.pageSchema()?.child?.push(item);
      });
        break;
      case 'button': this.pageSchema()?.child?.push(this.pageService.getButtonSchema());
        break;
      case 'text': this.pageSchema()?.child?.push(this.pageService.getTextSchema());
        break;
      case 'input': this.pageSchema()?.child?.push(this.pageService.getInputSchema());
        break;
      case 'image': this.pageSchema()?.child?.push(this.pageService.getImageSchema());
        break;
      case 'link': this.pageSchema()?.child?.push(this.pageService.getLinkSchema());
        break;
    };
  }

  get valueProperty(): unknown {
    let value: unknown;
    const valueList: any = this.pageSchema()?.styleProps.find((item: any) => item.name === 'value');
    if(!valueList) return;
    value = valueList.items.find((item: any) => item.name === 'buttonValue')?.default;
    if(!this.pageSchema()?.styleValues.buttonValue) return value;
    value = this.pageSchema()?.styleValues.buttonValue;
    return value;
  }
 
  public selectedSchema(e: PageSchema | undefined): void {
    if(!e) return;
    this.pageService.setSelectedPageSchema(e);
  }

}
