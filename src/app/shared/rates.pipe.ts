import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course-list/course/course.component';

@Pipe({
  name: 'rates'
})
export class RatesPipe implements PipeTransform {

  transform(courses: Array<Course>, minRating: number): Array<Course> {
    if (!courses) {
      return [];
    }
    if (!minRating || minRating <= 0) {
      return courses;
    }
    return courses.filter(course => {
      return course.rate >= minRating;
    });
  }

}
