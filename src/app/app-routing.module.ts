import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-list/course-details/course-details.component';
import { CourseListComponent } from './course-list/course-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path: 'main', component: CourseListComponent},
  {path: 'course/:id', component: CourseDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'editcourse/:id', component: EditCourseComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
