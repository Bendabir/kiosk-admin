import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const date = new Date(null);
    date.setSeconds(value);

    return date.toISOString().substr(11, 8);
  }
}
