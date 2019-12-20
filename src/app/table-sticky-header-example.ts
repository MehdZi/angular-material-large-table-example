import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * @title Table with sticky header
 */
@Component({
  selector: 'table-sticky-header-example',
  styleUrls: ['table-sticky-header-example.css'],
  templateUrl: 'table-sticky-header-example.html',
})
export class TableStickyHeaderExample implements OnInit {
  displayedColumns = ['select', 'issueDate', 'supplier', 'invoiceNumber', 'totalAmount', "totalTax", "legalMonetaryTotal"];
  dataSource = new MatTableDataSource<Invoice>(ELEMENT_DATA);

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  supplierCtrl = new FormControl();
  filteredSuppliers : Observable<string[]>;
  suppliers: string[] = ['Lemon'];
  allSuppliers: string[] = ['Apple', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('supplierInput', {static: false}) supplierInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredSuppliers = this.supplierCtrl.valueChanges.pipe(
        startWith(null),
        map((supplier: string | null) => supplier ? this._filter(supplier) : this.allSuppliers.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add supplier only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our supplier
      if ((value || '').trim()) {
        this.suppliers.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.supplierCtrl.setValue(null);
    }
  }

  remove(supplier: string): void {
    const index = this.suppliers.indexOf(supplier);

    if (index >= 0) {
      this.suppliers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.suppliers.push(event.option.viewValue);
    this.supplierInput.nativeElement.value = '';
    this.supplierCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSuppliers.filter(supplier => supplier.toLowerCase().indexOf(filterValue) === 0);
  }



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

  isEmpty() {
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      return true;
    }
    else return false;
  }
  testAlert() {
    const numSelected = this.selection.selected.length;
    const filteredSuppliers= this.suppliers;
    const selectedInvoices:string[] = [];
    this.selection.selected.forEach(item=>selectedInvoices.push(item.invoiceId));
    console.log(numSelected , selectedInvoices, filteredSuppliers);
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
  issueDate: Date;
  totalAmount: number;
  totalTax: number;
  legalMonetaryTotal: number;
  invoiceId:string;
}

const ELEMENT_DATA: Invoice[] = [
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: new Date(2019, 4, 11), totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: new Date(2019, 4, 11), totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: new Date(2019, 4, 11), totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: new Date(2019, 4, 11), totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  {supplier: "supplier", invoiceNumber: 'F19-7786937', issueDate: new Date(2019, 4, 11), totalAmount : 16700, totalTax : 3340, legalMonetaryTotal: 20040, invoiceId:'ABC'},
  
];


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */