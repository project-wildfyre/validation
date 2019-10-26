import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResourceViewerComponent} from "./resource-viewer/resource-viewer.component";


const routes: Routes = [
  { path: '', component: ResourceViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
