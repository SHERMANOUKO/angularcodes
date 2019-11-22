//an example of a custom filter pipe
//filter pipe returning property of starting price less than a certain amount
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(values: Observable<any[]>, searchText: any): any {
    if(!values) return []
    if(!searchText) return []
    return values.pipe(
      map<any, any>(data => data.filter(x => x.propertystartingPrice <= searchText.price))
    );
  }
