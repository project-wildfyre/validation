import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Bundle, BundleEntry, OperationOutcome, OperationOutcomeIssue} from "fhir-stu3";
import {BrowserService} from "../browser.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-resource-browser',
  templateUrl: './resource-browser.component.html',
  styleUrls: ['./resource-browser.component.scss']
})
export class ResourceBrowserComponent implements OnInit, AfterViewInit {

  constructor(public browserService: BrowserService) { }

  entries: BundleEntry[];

  public operationOutcome : OperationOutcome;

  public dataSource = new MatTableDataSource<OperationOutcomeIssue>();

  displayedColumns = ['icon', 'severity', 'diagnostics', 'location'];

  resource;

  ngOnInit() {
    this.browserService.getResourceChangeEmitter().subscribe(
        (result) => {
          const bundle: Bundle = result;
          if (bundle != undefined && bundle.entry != undefined) {
            console.log('entries = ' + bundle.total);
            this.entries = bundle.entry;
          }
        }
    )
    this.browserService.getValidationChangeEmitter().subscribe(
        (results) => {
          this.operationOutcome = results;
        }
    )
  }

  ngAfterViewInit() {
    console.log('after init');
    if (this.browserService.getResource() !== undefined) {
      const data = this.browserService.getResource();
      const bundle: Bundle = data;
      if (bundle != undefined && bundle.entry != undefined) {
        console.log('entries = ' + bundle.total);
        this.entries = bundle.entry;
      }

    }
    this.operationOutcome = this.browserService.getValidationResult();
  }

  onClick(entry,i) {
    this.resource = entry.resource;

    let entryIssues: OperationOutcomeIssue[] = [];
    if (this.operationOutcome != undefined) {

      for (const issue of this.operationOutcome.issue) {
        for (const location of issue.location) {
          if (location.includes('entry['+i+']')) {
            entryIssues.push(issue);
          }
        }
      }
    }
    console.log(entryIssues.length);
    this.dataSource.data = entryIssues;
  }

  /*
  convertToJson(data): Bundle {
    var object = JSON.parse(data);
    return object;
  }
  *
   */

  getIcon(i) {
    return 'code';
    /*
    if (i==0) return 'looks_zero';
    if (i==1) return 'looks_one';
    if (i==2) return 'looks_two';
    return 'looks_'+(i);*/
  }

  getErrorsCount(i) {
     let count = 0;
     if (this.operationOutcome != undefined) {
       console.log(this.operationOutcome);
       for (const issue of this.operationOutcome.issue) {
         for (const location of issue.location) {
          if (location.includes('entry['+i+']')) count++;
         }
       }
           }
        return count;
  }

}
