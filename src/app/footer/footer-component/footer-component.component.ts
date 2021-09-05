import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {

  year:string = "";

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear().toLocaleString().replace(",", "");
    console.log(this.year);

  }

}
