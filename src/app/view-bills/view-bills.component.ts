import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { ServerService } from "../server.service";
import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
  title = "View All Bills";
  dataSource;

  constructor(private billservice: ServerService) { }
  displayedColumns = ['Billdate', 'Ticketnumber' , 'Customername' , 'Vehiclenumber' ,'Customertype' , 'Itemtype' , 'Emptyweight' , 'Loadedweight' , 'Netweight' , 'Generatedby' , 'Bill' ] ;
  ngOnInit(): void {
    this.billservice.getAllBills()
    .subscribe(
      data => {this.dataSource = new MatTableDataSource(data['allBills']),console.log(data['allBills'])},
      error => console.log(error.error.message)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  savePDF(){
    const options = {
      filename: 'bill.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    };

    const element: Element = document.getElementById('pdfcontent');

    html2pdf()
      .from(element)
      .set(options)
      .save();
  }

  savexcel(){
    let element: Element = document.getElementById('pdfcontent');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb, 'bill.xlsx');
  }

}
