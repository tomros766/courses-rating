import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course-list/course/course.component';

@Pipe({
  name: 'semester'
})
export class SemesterPipe implements PipeTransform {

  transform(courses: Array<Course>, semester: number): Array<Course> {
    if (!courses) {
      return [];
    }
    if (!semester || semester <= 0 || semester > 10) {
      return courses;
    }
    return courses.filter(course => {
      return course.semester === semester;
    });
  }

}
