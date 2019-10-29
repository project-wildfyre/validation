import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OperationOutcome} from "fhir-stu3";

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  resource : any;


    validation: OperationOutcome;

  private config: any = {
    'baseUrl': 'https://data.developer.nhs.uk/ccri-fhir/STU3/'
  };

  conformanceChange: EventEmitter<any> = new EventEmitter();
  validationChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  getResource() {
    return this.resource;
  }

  getValidationResult() : OperationOutcome {
      //let validation = JSON.parse(this.validation);
      return this.validation;
  }

  getResourceChangeEmitter() {
    return this.conformanceChange;
  }
    getValidationChangeEmitter() {
        return this.validationChange;
    }

  setResource(resource : any) {
     this.resource = resource;
     let contentType = 'application/fhir+xml';
     if (resource[0] == '{') {
         contentType = 'application/fhir+json';
     }
     this.postContentType('Bundle/$validate',resource,contentType).subscribe(
         data => {

             this.validation = data;
             this.validationChange.emit(data);
         },
         err => {
             console.log(err);
         }
     );
     this.conformanceChange.emit(resource);
  }

    public postContentType(resource: string, body: any, contentType): Observable<any> {
        console.log('ContentType = ' + contentType);
        let headers: HttpHeaders = this.getHeaders(false);
        headers = headers.append('Content-Type', contentType);
        headers = headers.append('Accept', 'application/fhir+json');

        return this.http.post<any>(this.config.baseUrl + resource, body, {headers: headers});
    }

    getHeaders(contentType: boolean = true): HttpHeaders {

        let headers = new HttpHeaders(
        );
        if (contentType) {
            headers = headers.append('Content-Type', 'application/fhir+json');
            headers = headers.append('Accept', 'application/fhir+json');
        }
        return headers;
    }

}
