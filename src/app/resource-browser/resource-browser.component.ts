import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Bundle, BundleEntry} from "fhir-stu3";
import {BrowserService} from "../browser.service";

@Component({
  selector: 'app-resource-browser',
  templateUrl: './resource-browser.component.html',
  styleUrls: ['./resource-browser.component.scss']
})
export class ResourceBrowserComponent implements OnInit, AfterViewInit {

  constructor(public browserService: BrowserService) { }

  entries: BundleEntry[];

  resource = {
    "resourceType": "MedicationStatement",
    "id": "6bff710a-0bdc-4c9b-b98b-40db0a107edc",
    "meta": {
      "profile": [
        "https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-GPC-MedicationStatement-1"
      ]
    },
    "extension": [
      {
        "url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-CareConnect-GPC-MedicationStatementLastIssueDate-1",
        "valueDateTime": "2016-05-10"
      },
      {
        "url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-CareConnect-GPC-PrescribingAgency-1",
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "https://fhir.nhs.uk/STU3/CodeSystem/CareConnect-PrescribingAgency-1",
              "code": "prescribed-at-gp-practice",
              "display": "Prescribed at GP practice"
            }
          ]
        }
      }
    ],
    "basedOn": {
      "reference": "MedicationRequest/7e68abae-a50a-4dd2-8445-7a2aa9936bee"
    },
    "status": "completed",
    "medicationReference": {
      "reference": "Medication/c260b451-9821-42de-81f9-ba86dcea2c32"
    },
    "effectiveDateTime": "2016-05-10",
    "dateAsserted": "2016-05-10",
    "subject": {
      "reference": "Patient/04603d77-1a4e-4d63-b246-d7504f8bd833"
    },
    "taken": "unk",
    "note": [
      {
        "text": "Pharmacy Notes: NOTES FOR PHARMACY"
      }
    ],
    "dosage": [
      {
        "patientInstruction": "INSTRUCTIONS FOR PATIENT",
        "text": "TAKE ONE DAILY"
      }
    ]
  };

  ngOnInit() {
    this.browserService.getResourceChangeEmitter().subscribe(
        (result) => {
          var bundle: Bundle = this.convertToJson(result);
          if (bundle != undefined && bundle.entry != undefined) {
            console.log('entries = ' + bundle.total);
            this.entries = bundle.entry;
          }
        }
    )
  }

  ngAfterViewInit() {
    console.log('after init');
    if (this.browserService.getResource() !== undefined) {
      const data = this.browserService.getResource();
      var bundle: Bundle = this.convertToJson(data);
      if (bundle != undefined && bundle.entry != undefined) {
        console.log('entries = ' + bundle.total);
        this.entries = bundle.entry;
      }

    }
  }

  onClick(entry) {
    this.resource = entry.resource;
  }
  convertToJson(data): Bundle {
    var object = JSON.parse(data);
    return object;
  }

}
