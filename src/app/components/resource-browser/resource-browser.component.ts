import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Bundle, BundleEntry, OperationOutcome, OperationOutcomeIssue} from "fhir-stu3";
import {BrowserService} from "../../services/browser.service";
import {MatTableDataSource} from "@angular/material/table";
import {TdLoadingService} from "@covalent/core";

@Component({
    selector: 'app-resource-browser',
    templateUrl: './resource-browser.component.html',
    styleUrls: ['./resource-browser.component.scss']
})
export class ResourceBrowserComponent implements OnInit, AfterViewInit {

    constructor(public browserService: BrowserService,
                private _loadingService: TdLoadingService) {
    }

    entries: BundleEntry[];

    public operationOutcome: OperationOutcome;

    public dataSource = new MatTableDataSource<OperationOutcomeIssue>();

    displayedColumns = ['icon', 'diagnostics', 'location'];

    resource;

    selectedEntry = 0;

    ngOnInit() {
        this.browserService.getResourceChangeEmitter().subscribe(
            (result) => {

                this.processEntry(result);
            }
        );
        this.browserService.getValidationChangeEmitter().subscribe(
            (results) => {
                if (results == undefined) {

                    this._loadingService.register('overlayStarSyntax');
                } else {

                    this._loadingService.resolve('overlayStarSyntax');
                    this.operationOutcome = results;
                    if (this.entries != undefined && this.entries[this.selectedEntry] != undefined) {
                        this.onClick(this.entries[this.selectedEntry], this.selectedEntry);
                    }
                }
            }
        );
        console.log('after setting up subscribers');
        if (this.browserService.getResource() !== undefined) {
            this.browserService.triggerGetResource();
        }
        if (this.browserService.getValidationResult() != undefined) {
            this.browserService.triggerGetValidationResult();
        }
    }

    ngAfterViewInit() {

    }

    processEntry(data: any) {
        const bundle: Bundle = data;

        if (bundle != undefined) {
            if (bundle.resourceType == 'Bundle') {
                if (bundle.entry != undefined) {

                    this.entries = bundle.entry;
                    if (bundle.entry.length > 0) {
                        this.onClick(bundle.entry[0], 0);
                    }
                }
            } else {
                let newBundleEntry: BundleEntry = {
                    fullUrl: bundle.id,
                    resource: data
                };
                this.entries = [];
                this.entries.push(newBundleEntry);
                this.onClick(newBundleEntry, 0);
            }
        }
    }

    onClick(entry, i) {
        this.resource = entry.resource;
        this.selectedEntry = i;
        let entryIssues: OperationOutcomeIssue[] = [];
        if (this.operationOutcome != undefined) {

            for (const issue of this.operationOutcome.issue) {
                if (issue.location != undefined && issue.location.length > 0) {

                    var location = issue.location[0];
                    if (location.includes('Bundle.entry[' + i + ']')) {
                        entryIssues.push(issue);
                    } else {
                        // Not a bundle so include all
                        if (this.entries.length == 1) entryIssues.push(issue);
                    }

                }
            }
        }
        this.dataSource.data = entryIssues;
    }


    getIcon(i) {
        return 'code';
    }

    getErrorsCount(i) {
        let count = 0;
        if (this.operationOutcome != undefined) {

            for (const issue of this.operationOutcome.issue) {
                if (issue.location != undefined && issue.location.length > 0) {

                    var location = issue.location[0];

                    if (location.includes('Bundle.entry[' + i + ']')) count++;
                    else if (this.entries.length == 1) count++;
                }

            }
        }
        return count;
    }

}
