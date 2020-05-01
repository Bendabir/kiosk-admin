import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orNA'
})
export class OrNAPipe implements PipeTransform {
  transform(value: any): any {
    return value || 'N/A';
  }
}
