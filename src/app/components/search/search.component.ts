import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  
  @Output() enterEvent = new EventEmitter<string>();
  public inputEnFoco: boolean = false;
  public search!: string;


  constructor() {}

  ngOnInit() {}

  onInputFocus() {
    this.inputEnFoco = true;
  }

  onInputBlur() {
    this.inputEnFoco = false;
  }
  limpiarInput() {
    this.search = '';
  }

  searchEnter(){
    this.enterEvent.next(this.search)
  }
}