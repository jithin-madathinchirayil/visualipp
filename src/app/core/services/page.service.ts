import { Injectable } from '@angular/core';
import { PageSchema } from '@core/models/app.models';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pageProperties: BehaviorSubject<PageSchema | undefined> = new BehaviorSubject<PageSchema | undefined>(undefined);

  public getColumnSchema(number: number): PageSchema[] {
    let schemaList: PageSchema[] = [];
    for(const count of Array(number).fill(1).map((_,index) => index)) {
      schemaList.push(new PageSchema({
        name: `column-${count}`,
        type: 'column',
        child: []
      }));
    }
    return schemaList;
  }
  
  public setSelectedPageSchema(schema: PageSchema): void {
    this.pageProperties.next(schema);
  }
  public get SelectedPageSchema(): Observable<PageSchema | undefined> {
    return this.pageProperties.asObservable();
  }
}
