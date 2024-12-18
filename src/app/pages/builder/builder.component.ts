import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDropList, CdkDropListGroup, copyArrayItem } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { COMP_TABS, LAYOUT_ITEMS } from '@core/config/app.const';
import { PageSchema } from '@core/models/app.models';
import { SafeHtmlPipe } from '@core/pipes/safe-html.pipe';
import { PageService } from '@core/services/page.service';
import { ButtonGroupItem, Layout, LayoutColumn } from '@core/types/app.types';
import { ButtonGroupsComponent } from '@shared/components/button-groups/button-groups.component';
import { ComponentListComponent } from '@shared/components/component-list/component-list.component';
import { ComponentPreviewComponent } from '@shared/components/component-preview/component-preview.component';
import { ComponentPropertiesComponent } from '@shared/components/component-properties/component-properties.component';
import { ComponentTreeComponent } from '@shared/components/component-tree/component-tree.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [
    MatTooltip,
    NavbarComponent,
    LogoComponent,
    ButtonGroupsComponent,
    ComponentListComponent,
    ComponentPreviewComponent,
    ComponentPropertiesComponent,
    ComponentTreeComponent
  ],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
  host:{
    class:"w-full h-dvh flex flex-wrap content-start"
  }
})
export class BuilderComponent implements OnInit, OnDestroy {
  private pageService: PageService = inject(PageService);
  public compTabs: ButtonGroupItem[] = COMP_TABS;
  public layOutList: LayoutColumn[] = LAYOUT_ITEMS;
  public pageList: PageSchema[] = [];
  public selectedTab: WritableSignal<string | undefined> = signal<string | undefined>('layout');
  public layoutSchema: WritableSignal<Layout[]> = signal<Layout[]>([]);
  public enableBorder: WritableSignal<boolean> = signal<boolean>(true);
  public hideElement: WritableSignal<boolean> = signal<boolean>(false);
  public selectedPageSchema: WritableSignal<PageSchema> = signal<PageSchema>(new PageSchema({
    name: 'My Page',
    type: 'page',
    child: []
  }));
  public selectedComponentSchema: WritableSignal<PageSchema | undefined> = signal<PageSchema | undefined>(this.selectedPageSchema());
  public subscriptionList: Subscription[] = [];

  ngOnInit(): void {
    this.pageList.push(this.selectedPageSchema());
    this.onSelectedPageSchemaChanges();
  }

  private onSelectedPageSchemaChanges(): void {
    this.subscriptionList.push(this.pageService.SelectedPageSchema.subscribe((schema: PageSchema | undefined) => {
      if(!schema) return;
      this.selectedComponentSchema.update(() => schema);
      this.selectedTab.set('component');
    }));
  }

  public onTabChange(event: string | undefined): void {
    this.selectedTab.set(event);
  }

  public toggleHideElement(): void {
    this.hideElement.update((value: boolean) => !value);
  }

  public toggleEnableBorder(): void {
    this.enableBorder.update((value: boolean) => !value);
  }

  public selectedSchema(e: PageSchema | undefined): void {
    if(!e) return;
    this.pageService.setSelectedPageSchema(e);
  }

  public onPropertiesUpdated(e: any): void {
    this.selectedComponentSchema.update(() => e);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
