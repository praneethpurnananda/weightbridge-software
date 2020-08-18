import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-headings',
  templateUrl: './headings.component.html',
  styleUrls: ['./headings.component.css']
})
export class HeadingsComponent implements OnInit {
  @Input('parentData') public title;
  constructor() { }

  ngOnInit(): void {
  }

}
