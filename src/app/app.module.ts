import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';
/* any other core modules */
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { ResourceEditorComponent } from './components/resource-editor/resource-editor.component';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import 'hammerjs';
import { FHIRBrowserMainComponent } from './components/fhirbrowser-main/fhirbrowser-main.component';
import {
    CovalentCommonModule, CovalentDialogsModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
    CovalentJsonFormatterModule,
    CovalentMediaModule,
    CovalentMenuModule, CovalentMessageModule,
    CovalentNotificationsModule,
    CovalentTabSelectModule
} from "@covalent/core";
import {CovalentCodeEditorModule} from "@covalent/code-editor";
import {MatCardModule} from "@angular/material/card";
import { ResourceBrowserComponent } from './components/resource-browser/resource-browser.component';
import { ResourceValidatorComponent } from './components/resource-validator/resource-validator.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MessageService} from "./services/message.service";
import {ResponseInterceptor} from "./services/response-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorsHandler} from "./error-handler";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    ResourceEditorComponent,
    FHIRBrowserMainComponent,
    ResourceBrowserComponent,
    ResourceValidatorComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,

        CovalentLayoutModule,
        CovalentStepsModule,
        // (optional) Additional Covalent Modules imports
        CovalentHttpModule.forRoot(),
        CovalentHighlightModule,
        CovalentMarkdownModule,
        CovalentDynamicFormsModule,
        CovalentBaseEchartsModule,
        CovalentTabSelectModule,
        CovalentCommonModule,
        CovalentFileModule,
        CovalentCodeEditorModule,
        CovalentExpansionPanelModule,
        CovalentJsonFormatterModule,
        CovalentMediaModule,
        CovalentNotificationsModule,
        CovalentMenuModule,
        CovalentMessageModule,
        CovalentDialogsModule,
        MatRadioModule,
        MatSelectModule

    ],
  providers: [
      MessageService,
      {
          provide: ErrorHandler,
          useClass: ErrorsHandler,
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
