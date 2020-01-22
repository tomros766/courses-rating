import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { CoursesService } from 'src/app/services/courses.service';
import { UserServiceService } from 'src/app/services/user-service.service';



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private userService: UserServiceService, private coursesservice: CoursesService) {
    this.userService.getDB().collection('admin').get()
    .subscribe(data => data
      .forEach(param =>
        {if (this.userService.getUser() && param.get('email') === this.userService.getUser().email)
          { this.isAdmin = true; console.log(this.isAdmin); }}));
  }


  @Input()
  index: number;

  @Input()
  course: Course;

  @Output()
  courseTBR = new EventEmitter<Course>();

  @Output()
  rateEmitter = new EventEmitter<StarRatingComponent>();

 changeView = 'Rozwiń';
 detailsHidden = true;
 numberHidden = true;
 isAdmin = false;




  ngOnInit(): void {
  }

  expand() {
    if (this.changeView === 'Rozwiń') { this.changeView = 'Zwiń'; } else {this.changeView = 'Rozwiń'; }
    this.detailsHidden = !this.detailsHidden;
  }

  removeKurs(course: Course) {
    this.courseTBR.emit(course);
  }

  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    this.coursesservice.adjustRate($event.newValue, this.course);
  }
  showNumber() {
    this.numberHidden = false;
  }

  hideNumber() {
    this.numberHidden = true;
  }



}


export interface Course {
  id?: string;
  name: string;
  ects: number;
  semester: number;
  form: string;
  studentLimit: number;
  rate: number;
  countOfRates: number;

  avatarUrl: string;
  description: string;

  participants: string[];
  raters: string[];

  }


