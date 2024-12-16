import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { Component, effect, HostBinding, HostListener, inject, input, InputSignal, output } from '@angular/core';
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
  private pageService: PageService = inject(PageService);
  public pageSchema: InputSignal<PageSchema | undefined> = input<PageSchema | undefined>(undefined,{alias:"parentItem"});
  public enableBorder: InputSignal<boolean> = input<boolean>(false, {alias:"enableBorder"});
  public hideElement: InputSignal<boolean> = input<boolean>(false, {alias:"hideElement"});
  public onSelect = output<PageSchema | undefined>({alias:'onSelect'})
  private classList: string[] = [];
  constructor(){
    this.onInputChanges();
  }

  private onInputChanges(): void{
    effect(() => {
      if(this.pageSchema()?.type === 'page') {
        this.classList = ["w-full","h-full","flex","flex-wrap","content-start","bg-white",'cursor-pointer']
      }
      if(this.pageSchema()?.type === 'column') {
        this.classList = ["w-full","min-h-32","flex","content-start","relative",'cursor-pointer','p-2','hover:border-secondary-default']
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
    };
  }

  public selectedSchema(e: PageSchema | undefined): void {
    if(!e) return;
    this.pageService.setSelectedPageSchema(e);
  }

}
