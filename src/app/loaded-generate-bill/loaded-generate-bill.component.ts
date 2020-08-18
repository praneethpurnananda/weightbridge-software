import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loaded-generate-bill',
  templateUrl: './loaded-generate-bill.component.html',
  styleUrls: ['./loaded-generate-bill.component.css']
})
export class LoadedGenerateBillComponent implements OnInit {
  public title = "Loaded vehicle bill generation"
  constructor() { }

  ngOnInit(): void {
  }

}
