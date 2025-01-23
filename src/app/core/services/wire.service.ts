import { Injectable } from '@angular/core';
import { IPageSchema } from '@core/interfaces/app.interface';
import { GenericObject, PageTypes } from '@core/types/app.types';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { v4 as uuidv4 } from 'uuid';
import columnData from '@core/json/column.json';
import layoutData from '@core/json/layout.json';

@Injectable({
  providedIn: 'root'
})
export class WireService {
  private pageDestructed: IPageSchema[] = [];
  private pageList: BehaviorSubject<IPageSchema[]> = new BehaviorSubject<IPageSchema[]>([]);

  constructor() {
    this.initUnwind();
  }

  private async initUnwind(): Promise<void> {
    this.pageDestructed = [];
    await this.destructurePage(this.pageList.value);
  }

  async destructurePage(pageList: IPageSchema[]):Promise<boolean> {
    if(pageList.length === 0) return false;
    for(const page of pageList) {
      const pageRef: IPageSchema = {
        name: page.name,
        controlName: page.controlName,
        uid: page.uid,
        type: page.type,
        controlProps: page.controlProps,
        computedStyles: page.computedStyles,
        child: [],
      };
      this.pageDestructed.push(pageRef);
      if(page.child.length > 0) {
        await this.destructurePage(page.child);
      }
    }
    return true;
  }

  public getPageList(): Observable<IPageSchema[]> {
    return this.pageList.asObservable();
  }

  public setPageList(list: IPageSchema[]): void {
    this.pageList.next(list);
  }

  public addPage(page: IPageSchema): void {
    const newList = [...this.pageList.value, page];
    this.pageList.next(newList);
    this.initUnwind();
  }

  public getPageSchema(data: GenericObject): IPageSchema | undefined  {
    if(!data['type']) return;
      
    const pageSchema: IPageSchema = {
      name: String(data['name'] as string)+'-'+String(this.pageDestructed.filter((item: IPageSchema) => item.type === data['type']).length+1),
      controlName: data['controlName'] as string,
      type: data['type'] as PageTypes,
      uid: uuidv4(),
      controlProps: this.getControlProps(data['type'] as PageTypes),
      computedStyles: {},
      child:[]
    };
    return pageSchema;  
  }

  private getControlProps(type: PageTypes) {
    switch(type) {
      case 'layout': return layoutData.styleProps;
      case 'column': return columnData.styleProps;
      default: return [];
    }
  }
}