import { Component, OnInit, Pipe, PipeTransform, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-courses',
  templateUrl: './filter-courses.component.html',
  styleUrls: ['./filter-courses.component.css']
})


export class FilterCoursesComponent implements OnInit {
  @Output() textToSearch = new EventEmitter<string>();
  @Output() ratingToSearch = new EventEmitter<number>();
  @Output() ECTSToSearch = new EventEmitter<number>();
  @Output() semesterToSearch = new EventEmitter<number>();

  searchText: string;
  searchRating: number;
  searchECTS: number;
  searchSemester: number;

  constructor() { }

  ngOnInit() {
  }

  textSearch(): void {
    this.textToSearch.emit(this.searchText);
  }

  ratingSearch(): void {
    this.ratingToSearch.emit(this.searchRating);
  }

  semesterSearch(): void {
    this.semesterToSearch.emit(this.searchSemester);
  }

  ECTSSearch(): void {
    this.ECTSToSearch.emit(this.searchECTS);
  }

}
