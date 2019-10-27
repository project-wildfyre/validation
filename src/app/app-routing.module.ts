import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FHIRBrowserMainComponent} from "./fhirbrowser-main/fhirbrowser-main.component";
import {ResourceEditorComponent} from "./resource-editor/resource-editor.component";
import {ResourceValidatorComponent} from "./resource-validator/resource-validator.component";
import {ResourceBrowserComponent} from "./resource-browser/resource-browser.component";

const routes: Routes = [
  { path: '', component: FHIRBrowserMainComponent,
  children : [
   { path: '', component: ResourceEditorComponent},
      { path: 'editor', component: ResourceEditorComponent},
      { path: 'open', component: ResourceEditorComponent},
      { path: 'browse', component: ResourceBrowserComponent},
      { path: 'validate', component: ResourceValidatorComponent}
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
