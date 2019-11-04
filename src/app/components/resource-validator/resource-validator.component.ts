import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BrowserService} from "../../services/browser.service";
import {OperationOutcome, OperationOutcomeIssue} from "fhir-stu3";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {TdLoadingService} from "@covalent/core";

@Component({
  selector: 'app-resource-validator',
  templateUrl: './resource-validator.component.html',
  styleUrls: ['./resource-validator.component.scss']
})
export class ResourceValidatorComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { "static": true}) sort: MatSort;

  public dataSource = new MatTableDataSource<OperationOutcomeIssue>();

  constructor(public browserService : BrowserService,
              private _loadingService: TdLoadingService) {

  }

  displayedColumns = ['icon',  'diagnostics', 'location'];

  public operationOutcome : OperationOutcome;

  ngOnInit() {
    this.browserService.getValidationChangeEmitter().subscribe(
        results => {
          if (results == undefined) {
            this._loadingService.register('overlayStarSyntax');
          } else {
            this._loadingService.resolve('overlayStarSyntax');
            this.operationOutcome = results;
            if (results != undefined) {
              this.dataSource.data = this.operationOutcome.issue;
            } else {
              this.dataSource.data = [];
            }
          }
        }
    );
    if (this.browserService.getValidationResult() != undefined) {
      this.browserService.triggerGetValidationResult();
    }
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {



  }


}
