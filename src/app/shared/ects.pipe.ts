import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course-list/course/course.component';

@Pipe({
  name: 'ects'
})
export class EctsPipe implements PipeTransform {

  transform(courses: Array<Course>, ects: number): Array<Course> {
    if (!courses) {
      return [];
    }
    if (!ects || ects <= 0 || ects > 10) {
      return courses;
    }
    return courses.filter(course => {
      return course.ects === ects;
    });
  }

}
