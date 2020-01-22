import { Injectable } from '@angular/core';
import mockcourses from './mockdata.json';
import { Course } from '../course-list/course/course.component';
import { ThrowStmt } from '@angular/compiler';
import { StarRatingComponent } from 'ng-starrating';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Observable<Course[]>;
  ids: string;
  data: AngularFirestoreCollection<unknown>;

  constructor(private db: AngularFirestore) {
    this.data = this.db.collection<Course>('kursy');
    this.getKursy();
  }

  // getKursy() {
  //   console.log("siemanko, przyszedlem po kursy");
  //   this.data.get().subscribe(kursy => {
  //     for (let elem of kursy.docs) {
  //       if (this.getKurs(elem.get('name')) == null) {
  //         this.courses.push({
  //           id: elem.id,
  //           name: elem.get('name'),
  //           ects: elem.get('ects'),
  //           semester: elem.get('semester'),
  //           form: elem.get('form'),
  //           studentLimit: elem.get('studentLimit'),
  //           rate: elem.get('rate'),
  //           avatarUrl: elem.get('avatarUrl'),
  //           description: elem.get('description'),
  //           countOfRates: elem.get('countOfRates') != null ? (elem.get('raters') != null ? elem.get('raters').size : 0) : 0,
  //           participants: elem.get('participants'),
  //           raters: elem.get('raters'),
  //         });
  //       }
  //     }
  //   });
  //   return this.courses;
  // }

  getKursy() {
    this.courses = this.data.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const crs = a.payload.doc.data() as Course;
      const id = a.payload.doc.id;
      crs.id = id;

      return crs;
      }
      )));
    return this.data.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const crs = a.payload.doc.data() as Course;
      const id = a.payload.doc.id;
      crs.id = id;

      return crs;
      }
      )));
  }

  // getKurs(name: string) {
  //   if (this.courses == null) {
  //     return null;
  //   }
  //   const array: Course[] = [];
  //   this.courses.forEach((course) => {
  //     course.forEach(c => {
  //       if (this.equalName(name, c)) {
  //         array.push(c);
  //       }
  //     });
  //   });
  //   return array.pop();
  // }

  getKurs(id: string): Course {
    // if (this.courses == null) {return null; }

    let course: Course;
    let flag = false;
    this.courses.subscribe(crs => crs.forEach(c => {if (c.id === id) { course = c; flag = true; } console.log(course); }));
    return course;
  }


  deleteKurs(course: Course) {
    this.data.doc(course.id).delete();
  }

  addKurs(course: Course) {
    return this.data.add(course);
  }

  update(course: Course) {
    return this.data.doc(course.id).update(course);
  }

  // getId(course: Course) {
  //   let id: string;

  // }

  equals(course1: Course, course2: Course): boolean {
    if (course1 === course2) {
      return true; }
    if (course1.name === course2.name && course1.ects === course2.ects
      && course1.semester === course2.semester && course1.form === course2.form
      && course1.studentLimit === course2.studentLimit
      && course1.avatarUrl === course2.avatarUrl
      && course1.description === course2.description) {
        return true;
      }
    return false;
    }

    adjustRate(rate: number, course: Course) {
      const uid = firebase.auth().currentUser.uid;
      if (course.participants.includes(uid)
        && !course.raters.includes(uid)) {
        course.raters.push(uid);
        course.rate = course.rate * course.countOfRates + rate;
        course.countOfRates++;
        course.rate /= course.countOfRates;
        course.rate = Math.round(course.rate * 100) / 100;
        this.update(course);
      }
      else if(course.participants.includes(uid)) alert("Oddałeś już ocenę na ten kurs");
    }

    equalName(name: string, course: Course) {
      return course.name === name;
    }


  signUp(course: Course) {
    if (course.countOfRates < course.studentLimit) {
      if (!course.participants.includes(firebase.auth().currentUser.uid)) {
        course.participants.push(firebase.auth().currentUser.uid);
        this.data.doc(course.id).set({course}, {merge: true});
      } else { alert('Jesteś już zapisany na ten kurs'); }
    } else { alert('Nie mozesz zapisac się na ten kurs! Liczba miejsc została przekroczona!'); }
  }

}
