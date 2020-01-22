import { Component, OnInit, Input } from '@angular/core';
import { Course } from './course/course.component';
import { CoursesService } from '../services/courses.service';
import { StarRatingComponent } from 'ng-starrating';
import { NumberValueAccessor } from '@angular/forms';
import { SearchPipePipe } from '../shared/search-pipe.pipe';
import { RatesPipe } from '../shared/rates.pipe';
import { SemesterPipe } from '../shared/semester.pipe';
import { EctsPipe } from '../shared/ects.pipe';
import { UserServiceService } from '../services/user-service.service';
import { UserInfo } from 'firebase';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  isAdmin = false;


constructor(private userService: UserServiceService, private coursesservice: CoursesService) {
  this.userService.getDB().collection('admin').get()
  .subscribe(data => data.forEach(param => {if (this.userService.getUser() && param.get('email') === this.userService.getUser().email) { this.isAdmin = true; }}));
}

courses: Course[];
searchText = '';
searchRating = 0;
searchSemester = 0;
searchECTS = 0;
iPP = 10;
p = 1;


getKursy(): void {
  this.coursesservice.getKursy().subscribe(courses => {this.courses = courses; });
}

ngOnInit() {
  this.getKursy();
  }

removeCourse(course: Course) {
 this.coursesservice.deleteKurs(course);
 this.getKursy();
}

searchByTitle(searchText: string): void {
  this.searchText = searchText;
}
searchByRating(searchRating: number): void {
  this.searchRating = searchRating;
}
searchBySemester(semester: number): void {
  this.searchSemester = semester;
}
searchByEcts(searchECTS: number): void {
  this.searchECTS = searchECTS;
}

removeKurs(course: Course) {
  this.coursesservice.deleteKurs(course);
}






}

