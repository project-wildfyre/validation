import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OperationOutcome} from "fhir-stu3";

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  private resource : any;

  private rawResource : string;

  private validation: OperationOutcome;

  private config: any = {
    'baseUrl': 'http://localhost:8186/ccri-fhir/STU3/'
  };

  private resourceChange: EventEmitter<any> = new EventEmitter();
  private rawResourceChange: EventEmitter<any> = new EventEmitter();
  private validationChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  getResource() {
    return this.resource;
  }

    getRawResource() {
          return this.rawResource;
    }

  getValidationResult() : OperationOutcome {
      //let validation = JSON.parse(this.validation);
      return this.validation;
  }

    getRawResourceChangeEmitter() {
        return this.rawResourceChange;
    }

  getResourceChangeEmitter() {
    return this.resourceChange;
  }
    getValidationChangeEmitter() {
        return this.validationChange;
    }

    setValidation(result) {
        this.validation = result;
        this.validationChange.emit(result);
    }
    setResource(result) {
        this.resource = result;
        this.resourceChange.emit(result);
    }


    setRawResource(resource) {
        this.rawResource = resource;
        this.getRawResourceChangeEmitter().emit(this.rawResource);
    }

  setupResource(resource : any) {

     let contentType = 'application/fhir+xml';
     if (resource[0] == '{') {
         contentType = 'application/fhir+json';
     }
     // Clear previous results
      this.setRawResource(resource); // For editor
      this.setResource(undefined); // For browser
      this.setValidation(undefined); // for browser and validate

     // Call to enforce resource is in correct format (json)
      this.postContentType('$convert',resource,contentType).subscribe(
     resource => {
         this.setResource(resource);
         this.validateResource(resource);
     });
  }

  public validateResource(resource) {
      this.postContentType('$validate',resource,'application/fhir+json').subscribe(
          data => {
              this.setValidation(data);
          },
          err => {
              console.log(err);
          }
      );
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
