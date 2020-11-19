import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText'
})
export class LimitTextPipe implements PipeTransform {

  transform(value: string, limit?: number){
  //   if(!value)
  //   return null;

  // let actualLimit = (limit) ? limit: 20;
  // return value.substr(0, actualLimit)

  return null
  
  }

}
