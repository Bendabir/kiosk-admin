import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {
  private k = 1024;
  private sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  transform(bytes: number, decimals: number = 2, space: string = ''): any {
    if (bytes === 0) {
      return '0B';
    }

    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(this.k));

    return parseFloat((bytes / Math.pow(this.k, i)).toFixed(dm)) + space + this.sizes[i];
  }
}
