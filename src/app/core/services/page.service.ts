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

  public getButtonSchema(): PageSchema {
    return new PageSchema({
      name: 'button',
      type: 'button',
      child:[]
    })
  }

  public getTextSchema(): PageSchema {
    return new PageSchema({
      name: 'text',
      type: 'text',
      child:[]
    })
  }

  public getInputSchema(): PageSchema {
    return new PageSchema({
      name: 'input',
      type: 'input',
      child:[]
    })
  }

  public getImageSchema(): PageSchema {
    return new PageSchema({
      name: 'image',
      type: 'image',
      child: []
    })
  }

  public getLinkSchema(): PageSchema {
    return new PageSchema({
      name: 'link',
      type: 'link',
      child: []
    })
  }
  
  public setSelectedPageSchema(schema: PageSchema): void {
    this.pageProperties.next(schema);
  }
  public get SelectedPageSchema(): Observable<PageSchema | undefined> {
    return this.pageProperties.asObservable();
  }
}
