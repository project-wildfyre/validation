import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BrowserService} from "../browser.service";
import {OperationOutcome, OperationOutcomeIssue} from "fhir-stu3";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-resource-validator',
  templateUrl: './resource-validator.component.html',
  styleUrls: ['./resource-validator.component.scss']
})
export class ResourceValidatorComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { "static": true}) sort: MatSort;

  public dataSource = new MatTableDataSource<OperationOutcomeIssue>();

  constructor(public browserService : BrowserService) {
    this.browserService.validationChange.subscribe(
        results => {
          this.operationOutcome = results;
          this.dataSource.data = this.operationOutcome.issue;
        }
    )
  }

  displayedColumns = ['icon', 'severity', 'diagnostics', 'location'];

  public operationOutcome : OperationOutcome;

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    // console.log('after init');
    this.dataSource.sort = this.sort;
    this.operationOutcome = this.browserService.getValidationResult();
    this.dataSource.data = this.operationOutcome.issue;

  }


}
