import {Component, EventEmitter, OnInit} from '@angular/core';
import {BrowserService} from "../browser.service";
import {OperationOutcome} from "fhir-stu3";

@Component({
  selector: 'app-fhirbrowser-main',
  templateUrl: './fhirbrowser-main.component.html',
  styleUrls: ['./fhirbrowser-main.component.scss']
})
export class FHIRBrowserMainComponent implements OnInit {

  constructor(public browserService : BrowserService) {
      this.browserService.getValidationChangeEmitter().subscribe(
          results => {
            this.validation = results;
            this.getErrorCount();
          }
      )
  }

  public loadComplete: EventEmitter<any> = new EventEmitter();

  files: any;

  private validation: OperationOutcome;

  public errorCount;

  public validationFlags: any = [
    { 'item' : 'Errors',
      'count' : '0',
      'icon': 'error'},
    { 'item' : 'Warnings',
      'count' : '0',
    'icon' : 'warning'},
    { 'item' : 'Information',
      'count' : '0',
      'icon': 'info'}
      ];

  ngOnInit() {
  }

  public getErrorCount () {
    if (this.validation === undefined) return 0;
    this.errorCount = 0;
    this.validationFlags[0].count = 0;
    this.validationFlags[1].count = 0;
    this.validationFlags[2].count = 0;
    for(const item of this.validation.issue) {

     // if (item.severity == 'error' || item.severity == 'warning' ) this.errorCount++;
      switch (item.severity) {
        case 'error':
          this.errorCount++;
          this.validationFlags[0].count++;
          break;
        case 'warning':
          this.errorCount++;
          this.validationFlags[1].count++;
          break;
        case 'information':
          this.validationFlags[2].count++;
          break;
      }
    }
    console.log('Validation Errors = '+ this.errorCount);
  }

  selectEvent(file: FileList | File): void {
    if (file instanceof File) {
      let reader = new FileReader();
      reader.readAsText(file);
      this.loadComplete.subscribe( (data) => {
            this.browserService.setupResource(data);
          }
      );
      const me = this;
      reader.onload = (event: Event) => {
        if (reader.result instanceof ArrayBuffer) {
          // console.log('array buffer');

          me.loadComplete.emit(reader.result);
        } else {
          // console.log('not a buffer');
          me.loadComplete.emit(reader.result);
        }
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    }
  }

}
