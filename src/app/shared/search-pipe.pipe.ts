import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course-list/course/course.component';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: Course[], arg: string): Course[] {
    if(!value) return [];
    if(!arg) return value;

    arg = arg.toLowerCase();

    return value.filter(e => e.name.toLowerCase().includes(arg));
  }

}
