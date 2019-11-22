import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {TdLoadingService, TdMediaService} from "@covalent/core";
import {BrowserService} from "../../services/browser.service";
import {saveAs as importedSaveAs} from "file-saver";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-editor.component.html',
  styleUrls: ['./resource-editor.component.scss']
})
export class ResourceEditorComponent implements OnInit, AfterViewInit {

  constructor(public media: TdMediaService,
              private router:Router,
              private route: ActivatedRoute,
              public browserService: BrowserService,
              private _loadingService: TdLoadingService) { }

  // Code Editor


    language = 'json';

    profile: string =undefined;

    model =JSON.stringify(
        {
            "resourceType": "Patient",
            "id": "1",
            "meta": {
                "lastUpdated": "2019-11-22T15:23:41.149+00:00",
                "profile": [
                    "https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1"
                ]
            },
            "extension": [
                {
                    "url": "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-EthnicCategory-1",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-EthnicCategory-1",
                                "code": "A",
                                "display": "British, Mixed British"
                            }
                        ]
                    }
                }
            ],
            "identifier": [
                {
                    "extension": [
                        {
                            "url": "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-NHSNumberVerificationStatus-1",
                            "valueCodeableConcept": {
                                "coding": [
                                    {
                                        "system": "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-NHSNumberVerificationStatus-1",
                                        "code": "01",
                                        "display": "Number present and verified"
                                    }
                                ]
                            }
                        }
                    ],
                    "system": "https://fhir.nhs.uk/Id/nhs-number",
                    "value": "9876543210"
                },
                {
                    "system": "https://fhir.leedsth.nhs.uk/Id/pas-number",
                    "value": "ABC8650149"
                }
            ],
            "name": [
                {
                    "use": "official",
                    "family": "Kanfeld",
                    "given": [
                        "Bernie"
                    ],
                    "prefix": [
                        "Miss"
                    ]
                }
            ],
            "telecom": [
                {
                    "system": "phone",
                    "value": "0115 9737320",
                    "use": "home"
                },
                {
                    "system": "email",
                    "value": "bernie.kanfeld@nhsdigital.nhs.uk",
                    "use": "home"
                }
            ],
            "gender": "female",
            "birthDate": "1998-03-19",
            "address": [
                {
                    "use": "work",
                    "line": [
                        "Field Jardin",
                        "Long Eaton"
                    ],
                    "city": "Nottingham",
                    "district": "Derbyshire",
                    "postalCode": "NG10 1ZZ"
                }
            ],
            "maritalStatus": {
                "coding": [
                    {
                        "system": "http://hl7.org/fhir/v3/MaritalStatus",
                        "code": "S",
                        "display": "Never Married"
                    }
                ]
            },
            "generalPractitioner": [
                {
                    "reference": "Practitioner/1",
                    "display": "Dr. AA Bhatia"
                }
            ],
            "managingOrganization": {
                "reference": "Organization/1",
                "display": "The Moir Medical Centre"
            }
        }, null, 2);

    editorOptions = {theme: 'vs',
    language: 'json'};

  validate() {
      //this._loadingService.register('overlayStarSyntax');
      this.browserService.setupResource(this.model, this.profile);
  }

  ngOnInit() {


      this.browserService.getRawResourceChangeEmitter().subscribe(
          (data) => {

              this.model = data.trim();
              if (this.model[0] =='<')  {
                  this.language = 'xml';
              } else {
                  this.language = 'json';
              }
          }
      );
      this.browserService.getProfileChange().subscribe(
          (profile) => {
              this.profile = profile;
          }
      );

      this.browserService.getValidationChangeEmitter().subscribe(
          (data) => {
              if (data == undefined) {
                  // Is Validating
                  this._loadingService.register('overlayStarSyntax');
              } else {
                  this._loadingService.resolve('overlayStarSyntax');
                  console.log(this.router.url);
                  if (this.router.url.includes('editor')) {
                      this.router.navigate(['/browse']);
                  }
              }
          }
      );

      if (this.browserService.getRawResource() !== undefined) {
          console.log('trigger getRawResource');
          this.browserService.triggerGetRawResource();
      }
      if (this.browserService.getProfile() !== undefined) {
          this.browserService.triggerGetProfile();
      }

  }
    ngAfterViewInit() {
        // console.log('after init');

    }

    onInit(editor) {
        let line = editor.getPosition();
        console.log(line);
    }

    save(){
        {
            if (this.model[0]=='<')  {
                this.language = 'xml';
            } else {
                this.language ='json';
            }
            const blob = new Blob([this.model], { type: 'text/'+this.language });
            importedSaveAs(blob);
        }
    }


}
