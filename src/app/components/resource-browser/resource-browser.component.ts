import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
    AllergyIntolerance,
    Bundle,
    BundleEntry,
    CodeableConcept,
    Coding,
    DocumentReference,
    Encounter,
    HealthcareService,
    HumanName,
    List,
    Medication,
    MedicationRequest,
    MedicationStatement,
    MessageHeader,
    Observation,
    OperationOutcome,
    OperationOutcomeIssue,
    Organization,
    Patient,
    Practitioner,
    Procedure,
    Reference
} from "fhir-stu3";
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

    getName(entry: BundleEntry) :string {
        switch (entry.resource.resourceType) {
            case "MedicationStatement":
                var ms: MedicationStatement = <MedicationStatement> entry.resource;
                return this.getReferenceName(ms.medicationReference);
            case "MedicationRequest":
                var mr: MedicationRequest = <MedicationRequest> entry.resource;
                return this.getReferenceName(mr.medicationReference);
            case "Medication":
                var m: Medication = <Medication> entry.resource;
                return this.getCodeName(m.code);
            case "Observation":
                var o: Observation = <Observation> entry.resource;
                return this.getCodeName(o.code);
            case "Procedure":
                var proc : Procedure = <Procedure> entry.resource;
                return this.getCodeName(proc.code);
            case "Patient":
                var p: Patient = <Patient> entry.resource;
                return this.getHumanName(p.name[0]);
            case "Practitioner":
                var pr: Practitioner = <Practitioner> entry.resource;
                return this.getHumanName(pr.name[0]);
            case "AllergyIntolerance":
                var al: AllergyIntolerance = <AllergyIntolerance> entry.resource;
                return this.getCodeName(al.code);
            case "Encounter":
                var e: Encounter = <Encounter> entry.resource;
                return this.getCodesName(e.type);
            case "MessageHeader":
                var mh: MessageHeader = <MessageHeader> entry.resource;
                return this.getCodingName(mh.event);
            case "HealthcareService":
                var hs: HealthcareService = <HealthcareService> entry.resource;
                return this.getCodesName(hs.type);
            case "DocumentReference":
                var dr: DocumentReference = <DocumentReference> entry.resource;
                return this.getCodeName(dr.type);
            case "Organization":
                var org: Organization = <Organization> entry.resource;
                return org.name;
            case "List":
                var ls: List = <List> entry.resource;
                return ls.title;
            default:
                return "";
        }
    }

    getCodingName(code: Coding) {
        return code.display;
    }

    getCodesName(concepts: CodeableConcept[]) {

        if (concepts.length > 0) {
            const concept = concepts[0];
            if (concept.coding != undefined && concept.coding.length > 0) {
                return concept.coding[0].display;
            }
        }
        return "";
    }

    getCodeName(concept: CodeableConcept) {
        if (concept.coding != undefined && concept.coding.length>0) {
            return concept.coding[0].display;
        }
        return "";
    }

    getHumanName(name : HumanName) {
        if (name == undefined) return "";
        var nm = name.family;
        if (name.given != undefined) nm = nm + ", "+ name.given.join(" ");
        return nm;
    }
    getReferenceName(ref : Reference) {
        if (ref == undefined) return "";
        return ref.display;
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
