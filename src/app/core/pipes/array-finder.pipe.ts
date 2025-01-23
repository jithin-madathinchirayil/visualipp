import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFinder',
  standalone: true
})
export class ArrayFinderPipe implements PipeTransform {

  transform(value: any[], filed: string,key: any): any {
    return value.find((child: any) => child[filed] === key);
  }

}
