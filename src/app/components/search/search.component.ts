import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  
  @Output() searchTextChanged = new EventEmitter<string>();
  searchText: string = "";

  constructor() {}

  ngOnInit() {}

  onSearch(value: string) {
    this.searchTextChanged.emit(value);
  }
}