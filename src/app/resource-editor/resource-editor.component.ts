import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {TdMediaService} from "@covalent/core";
import {BrowserService} from "../browser.service";

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-editor.component.html',
  styleUrls: ['./resource-editor.component.scss']
})
export class ResourceEditorComponent implements OnInit, AfterViewInit {

  constructor(public media: TdMediaService, public browserService: BrowserService) { }

  // Code Editor
  model: any;

  input: string = '{ \n' +
      "\t\"resourceType\" :" +
      "\"...\" \n"+
      '}';

  public json = true;

  ngOnInit() {
      this.browserService.getResourceChangeEmitter().subscribe(
          (data) => {
               this.input = data.trim();

               if (this.input[0]=='<')  {
                 this.json = false;
               } else {
                 this.json = true;
               }

          }
      )
  }
    ngAfterViewInit() {
        // console.log('after init');
        if (this.browserService.getResource() !== undefined) {
            this.input = this.browserService.getResource().trim();

            if (this.input[0]=='<')  {
                this.json = false;
            } else {
                this.json = true;
            }
        }
    }
}
