import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {debounce, map, debounceTime} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { Course } from '../course-list/course/course.component';


@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private coursesService: CoursesService) {}

  modelForm: FormGroup;


  formErrors = {
    name: '',
    ects: '',
    semester: '',
    form: '',
    studentLimit: '',
    avatarUrl: '',
    description: '',
  };

  private validationMessages = {
    name: {
      required: 'nazwa jest wymagana'
    },
    ects: {
      required: 'liczba ects jest wymagana',
      max: 'liczba ects nie moze byc wieksza niz 6',
      min: 'liczba ects musi byc wieksza od 0'
    },
    semester: {
      required: 'semestr jest wymagany',
      max: 'semestr nie moze byc wiekszy niz 10',
      min: 'semestr musi byc wiekszy od 0'
    },
    form: {
      required: 'forma zajec jest wymagana',
      pattern: 'Forma zajec musi nalezec do zbioru: Lecture, Recitation, Labs, Project'
    },
    studentLimit: {
      required: 'minimalna liczba studentow jest wymagana',
      max: 'liczba studentow nie moze byc wieksza niz 200',
      min: 'liczba studentow musi byc wieksza od 10'
    },
    description: {
      required: 'opis przedimotu jest wymagany',
      maxLength: 'liczba znakow nie moze byc przekroczyc niz 200',
      minLength: 'liczba znakow musi byc wieksza od 20'
    },
  };

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      ects: ['', [Validators.required, Validators.min(1), Validators.max(6)]],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      form: ['', [Validators.required, Validators.pattern('Lecture|Recitation|Labs|Project')]],
      studentLimit: ['', [Validators.required, Validators.min(10), Validators.max(200)]],
      avatarUrl: [''],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
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

    const course: Course = ({name: form.value.name, ects: form.value.ects, semester: form.value.semester, form: form.value.semester,
                          studentLimit: form.value.studentLimit, rate: 0, countOfRates: 0, avatarUrl: form.value.avatarUrl,
                          description: form.value.description, raters: [], participants: []});

    this.coursesService.addKurs(course);
    this.modelForm.reset();
  }


}
