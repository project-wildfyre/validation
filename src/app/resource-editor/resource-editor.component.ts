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


  model: string = '{ \n' +
      "\t\"resourceType\" :" +
      "\"...\" \n"+
      '}';

  public json = true;

  ngOnInit() {
      this.browserService.getRawResourceChangeEmitter().subscribe(
          (data) => {



              this.model = data.trim();
              if (this.model[0] =='<')  {
                  this.json = false;
              } else {
                  this.json = true;
              }
          }
      )
  }
    ngAfterViewInit() {
        // console.log('after init');
        if (this.browserService.getRawResource() !== undefined) {

            this.model = this.browserService.getRawResource().trim();
            if (this.model[0]=='<')  {
                this.json = false;
            } else {
                this.json = true;
            }

        }
    }
}
