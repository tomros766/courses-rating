import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CoursesService } from '../services/courses.service';
import { Course } from '../course-list/course/course.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserServiceService, private formBuilder: FormBuilder, private coursesservice: CoursesService) {
    // let courses = this.coursesservice.getKursy().subscribe(crs => courses = crs);
    this.coursesservice.getKursy().subscribe(courses => courses.forEach((c: Course) => {
      if (c.id === this.route.snapshot.params.id) {
        this.course = c;
      }
    }));
   }

  course: Course;
  modelForm: FormGroup;

  formErrors = {
    name: '',
    ects: '',
    semester: '',
    form: '',
    studentLimit: '',
    avatarUrl: '',
    description: '',
    countOfRates: '',
    rate: ''
  };

  private validationMessages = {
    ects: {
      max: 'liczba ects nie moze byc wieksza niz 6',
      min: 'liczba ects musi byc wieksza od 0'
    },
    semester: {
      max: 'semestr nie moze byc wiekszy niz 10',
      min: 'semestr musi byc wiekszy od 0'
    },
    form: {
      pattern: 'Forma zajec musi nalezec do zbioru: Lecture, Recitation, Labs, Project'
    },
    studentLimit: {
      max: 'liczba studentow nie moze byc wieksza niz 200',
      min: 'liczba studentow musi byc wieksza od 10'
    },
    description: {
      maxLength: 'liczba znakow nie moze byc przekroczyc niz 200',
      minLength: 'liczba znakow musi byc wieksza od 20'
    },
    countOfRates: {
      min: 'liczba ocen musi byc wieksza od 0'
    },
    rate: {
      max: 'ocena nie moze byc wieksza niz 5',
      min: 'ocena musi byc wieksza od 0'
    },
  };

  ngOnInit() {


    this.modelForm = this.formBuilder.group({
      name: [''],
      ects: ['', [Validators.min(1), Validators.max(6)]],
      semester: ['', [Validators.min(1), Validators.max(10)]],
      form: ['', [Validators.pattern('Lecture|Recitation|Labs|Project')]],
      studentLimit: ['', [Validators.min(10), Validators.max(200)]],
      avatarUrl: ['', Validators.required],
      description: ['', [ Validators.minLength(20), Validators.maxLength(200)]],
      countOfRates: ['', Validators.min(0)],
      rate: ['', [Validators.min(1), Validators.max(5)]]
    });

    this.modelForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged();
    });

    this.onControlValueChanged();
  }

  onControlValueChanged() {
    const form = this.modelForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          alert(validationMessages[key]);
        }
      }
    }
  }

  onSubmit(form): void {
    if (form.value.name && this.course.name !== form.value.name) { this.course.name = form.value.name; }
    if (form.value.ects && this.course.ects !== form.value.ects) { this.course.ects = form.value.ects; }
    if (form.value.semester && this.course.semester !== form.value.semester) { this.course.semester = form.value.semester; }
    if (form.value.form && this.course.form !== form.value.form) { this.course.form = form.value.form; }
    if (form.value.studentLimit && this.course.studentLimit !== form.value.studentLimit) { this.course.studentLimit = form.value.studentLimit; }
    if (form.value.avatarUrl && this.course.avatarUrl !== form.value.avatarUrl) { this.course.avatarUrl = form.value.avatarUrl; }
    if (form.value.description && this.course.description !== form.value.description) { this.course.description = form.value.description; }
    if (form.value.countOfRates && this.course.countOfRates !== form.value.countOfRates) { this.course.countOfRates = form.value.countOfRates; }
    if (form.value.rate && this.course.rate !== form.value.rate) { this.course.rate = form.value.rate; }

    this.coursesservice.update(this.course);

    this.router.navigate(['/main']);

  }

  removeKurs() {
    this.coursesservice.deleteKurs(this.course);
  }


}
