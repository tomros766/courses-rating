import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { RatingModule } from 'ng-starrating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course-list/course/course.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from './shared/search-pipe.pipe';
import { FilterCoursesComponent } from './filter-courses/filter-courses.component';
import { RatesPipe } from './shared/rates.pipe';
import { SemesterPipe } from './shared/semester.pipe';
import { EctsPipe } from './shared/ects.pipe';
import { CoursesService } from './services/courses.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CourseDetailsComponent } from './course-list/course-details/course-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from '../environments/environment';
import { UserServiceService } from './services/user-service.service';
import { EditCourseComponent } from './edit-course/edit-course.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseComponent,
    NewCourseComponent,
    SearchPipePipe,
    FilterCoursesComponent,
    RatesPipe,
    SemesterPipe,
    EctsPipe,
    CourseDetailsComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    EditCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxPaginationModule
  ],
  providers: [CoursesService, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
