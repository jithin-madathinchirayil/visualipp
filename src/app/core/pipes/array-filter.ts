import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  standalone: true
})
export class ArrayFilterPipe implements PipeTransform {

  transform(value: any[], filed: string,key: any): any {
    return value.filter((child: any) => child[filed] === key);
  }

}
