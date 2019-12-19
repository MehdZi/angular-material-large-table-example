import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

/**
 * @title Table with sticky header
 */
@Component({
  selector: 'table-sticky-header-example',
  styleUrls: ['table-sticky-header-example.css'],
  templateUrl: 'table-sticky-header-example.html',
})
export class TableStickyHeaderExample implements OnInit {
  displayedColumns = ['select','supplier', 'invoiceNumber', 'issueDate', 'totalAmount', "totalTax", "legalMonetaryTotal"];
  dataSource = new MatTableDataSource<Invoice>(ELEMENT_DATA);

  selection = new SelectionModel<Invoice>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  testAlert() {
    const numSelected = this.selection.selected.length;
    const selectedInvoices:string[] = [];
    this.selection.selected.forEach(item=>selectedInvoices.push(item.invoiceId));
    console.log(numSelected , selectedInvoices);
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}


export interface Invoice {
  supplier : string;
  invoiceNumber: string;
  issueDate: string;
  totalAmount: number;
  totalTax: number;
  legalMonetaryTotal: number;
  invoiceId:string;
}

const ELEMENT_DATA: Invoice[] = [
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: '11/04/2019', totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: '11/04/2019', totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: '11/04/2019', totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: '11/04/2019', totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: '11/04/2019', totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  
];


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */