import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course/course.component';
import { CoursesService } from 'src/app/services/courses.service';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute, Params } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courses: Course[];
  course: Course;

  numberHidden = true;


  constructor(private route: ActivatedRoute, private userService: UserServiceService, private coursesservice: CoursesService) {
    this.coursesservice.getKursy()
    .subscribe(courses => courses
      .forEach(c => {if (c.id === this.route.snapshot.params.id) { this.course = c; }}));
  }

  ngOnInit() {
  }
  getKursy(): void {
    this.coursesservice.getKursy().subscribe(courses => this.courses = courses);
  }


  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    if (this.canRate()) { this.coursesservice.adjustRate($event.newValue, this.course);
    } else {
      alert('Musisz być zalogowany aby ocenić kurs!');
    }

  }

  showNumber() {
    this.numberHidden = false;
  }

  hideNumber() {
    this.numberHidden = true;
  }

  signUpToCourse() {
    if (this.userService.getUser() !== null) {
      console.log(this.course);
      this.coursesservice.signUp(this.course);
    } else { alert('Aby zapisać się na kurs musisz być zalogowany!'); }
  }


  canRate() {
    return this.userService.getUser() !== null;
  }



}
