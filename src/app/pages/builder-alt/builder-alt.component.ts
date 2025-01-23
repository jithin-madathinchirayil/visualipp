import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { AsyncPipe, NgClass } from '@angular/common';
import { TreeElementComponent } from '@shared/elements/tree-element/tree-element.component';
import { WireService } from '@core/services/wire.service';
import { Observable } from 'rxjs/internal/Observable';
import { IElement, IPageSchema } from '@core/interfaces/app.interface';
import { ApiService } from '@core/services/api.service';
import { HtmlElementComponent } from '@shared/elements/html-element/html-element.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';
import { HtmlPreviewComponent } from '@shared/elements/html-preview/html-preview.component';
import { HtmlPropertyComponent } from '@shared/elements/html-property/html-property.component';
@Component({
  selector: 'app-builder-alt',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    LogoComponent,
    MatIcon,
    MatMenuModule,
    TreeElementComponent,
    HtmlElementComponent,
    HtmlPreviewComponent,
    HtmlPropertyComponent
  ],
  templateUrl: './builder-alt.component.html',
  styleUrl: './builder-alt.component.scss',
  host:{
    class:"w-full h-dvh flex flex-wrap content-start bg-gray-100"
  }
})
export class BuilderAltComponent implements OnInit, OnDestroy {
  private wireService: WireService = inject(WireService);
  private apiService: ApiService = inject(ApiService);
  private subscriptionList: Subscription[] = [];
  public enableSidebar: boolean = false;
  public enableLayouts: boolean = true;
  public enableProperties: boolean = true;
  public selectedTab: string = 'layout';
  public pageList: Observable<IPageSchema[]> = this.wireService.getPageList().pipe(debounceTime(0),map((res: IPageSchema[]) => {
    if(res.length === 0) {
      this.addNewPage();
    } else {
      this.selectedPage = res[0];
      this.selectedPageName.setValue(this.selectedPage.name);
    }
    return res;
  }));
  public elementList: Observable<IElement[]> = this.apiService.getAllElements();
  public selectedPageName: FormControl = new FormControl(null);
  public selectedPage: IPageSchema | undefined;

  ngOnInit(): void {
    this.onPageNameChanges();
  }

  private onPageNameChanges(): void {
    this.subscriptionList.push(this.selectedPageName.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200)
      )
      .subscribe({
      next:(value: null | string) => {
        if(!value || !this.selectedPage) return;
        this.selectedPage!.name = value;
      }
    }));
  }

  public toggleSidebar(): void {
    this.enableSidebar = !this.enableSidebar;
  }

  public toggleLayout(): void {
    this.enableLayouts = !this.enableLayouts;
  }

  public toggleProperties(): void {
    this.enableProperties = !this.enableProperties;
  }

  public setTab(tab: string): void {
    this.selectedTab = tab;
  }

  public onPageSelect(page: IPageSchema,e: MouseEvent): void {
    e.stopImmediatePropagation();
    this.selectedPage = page;
    this.selectedPageName.setValue(this.selectedPage.name)
  }

  public addNewPage(): void {
    const newPage: IPageSchema | undefined = this.wireService.getPageSchema({name:'page',type:'layout',controlName:'page'});
    if(!newPage) return;
    this.wireService.addPage(newPage);
  }

  public onPropertyChange(e: any): void {
    if(!this.selectedPage) return;
    this.selectedPage.computedStyles = {...this.selectedPage.computedStyles,...e}; 
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((item: Subscription) => item.unsubscribe());
  }
}
