import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, fields: string[]): any[] {
    console.log(" este es el pipe")
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return fields.some(field => {
        return item[field].toString().toLowerCase().includes(searchText);
      });
    });
  }

}
