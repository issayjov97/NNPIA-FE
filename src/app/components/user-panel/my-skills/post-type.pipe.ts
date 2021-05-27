import { Post, PostType } from './../../skills/post';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class PostTypePipe implements PipeTransform {

  transform(value: any, type: PostType): any {
    return value.filter((it: Post) => it.type == type);
  }

}
