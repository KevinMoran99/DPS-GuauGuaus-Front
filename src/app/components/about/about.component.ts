import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  columns: Number;

  constructor() { }

  ngOnInit(): void {
    this.columns = (window.innerWidth <= 850) ? 1 : 3;
  }
  onResize(event) {
    this.columns = (event.target.innerWidth <= 850) ? 1 : 3;
  }

}
