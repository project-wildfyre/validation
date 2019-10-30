import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from "rxjs/operators";
import {MessageService} from "./message.service";


  @Injectable()
  export class ResponseInterceptor implements HttpInterceptor {

    constructor(private messageService : MessageService,
    )  {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

           // console.log(" all looks good");
            // http response status code
           // console.log(event.status);
          }
        }, error => {
         // console.log(request);
          if (error.status == 401) {
            this.messageService.addMessage('401 UNAUTHORIZED - The request has not been applied because it lacks valid authentication credentials for the target resource.');
          } else if (error.status == 0) {
            this.messageService.addMessage('Server unavailable or Request Blocked (CORS)');
          } else {
            console.error('response intercept status :'+ error.status + 'response intercept message :'+ error.message);
           // Handle in calling function this.messageService.addMessage(error.message);
          }

        })
      )
        ;
    }

}
