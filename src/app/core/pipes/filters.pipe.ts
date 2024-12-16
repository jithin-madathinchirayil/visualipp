import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'childFinder',
  standalone: true
})
export class ChildFinderPipe implements PipeTransform {

  transform(value: any[], parentId: string): any {
    return value.find((child: any) => child.parent === parentId);
  }

}
