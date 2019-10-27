import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-browser',
  templateUrl: './resource-browser.component.html',
  styleUrls: ['./resource-browser.component.scss']
})
export class ResourceBrowserComponent implements OnInit {

  constructor() { }

  navmenu: Object[] = [{
    icon: 'looks_one',
    route: '.',
    title: 'MedicationStatement',
    description: '6bff710a-0bdc-4c9b-b98b-40db0a107edc',
  }, {
    icon: 'looks_two',
    route: '.',
    title: 'MedicationRequest',
    description: 'plan <br> id',
  }, {
    icon: 'looks_3',
    route: '.',
    title: 'Third item',
    description: 'Item description',
  }, {
    icon: 'looks_4',
    route: '.',
    title: 'Fourth item',
    description: 'Item description',
  }, {
    icon: 'looks_5',
    route: '.',
    title: 'Fifth item',
    description: 'Item description',
  },{
    icon: 'looks_two',
    route: '.',
    title: 'Second item',
    description: 'Item description',
  }, {
    icon: 'looks_3',
    route: '.',
    title: 'Third item',
    description: 'Item description',
  },
  ];

  object = {
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
  }

}
