import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {TdMediaService} from "@covalent/core";
import {BrowserService} from "../../services/browser.service";
import {saveAs as importedSaveAs} from "file-saver";

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

  public format="json";

  validate() {
      this.browserService.setupResource(this.model);
  }

  ngOnInit() {
      this.browserService.getRawResourceChangeEmitter().subscribe(
          (data) => {

              this.model = data.trim();
              if (this.model[0] =='<')  {
                  this.format = 'xml';
              } else {
                  this.format = 'json';
              }
          }
      )
  }
    ngAfterViewInit() {
        // console.log('after init');
        if (this.browserService.getRawResource() !== undefined) {

            this.model = this.browserService.getRawResource().trim();
            if (this.model[0]=='<')  {
                this.format = 'xml';
            } else {
                this.format ='json';
            }

        }
    }

    save(){
        {

            if (this.model[0]=='<')  {
                this.format = 'xml';
            } else {
                this.format ='json';
            }
            const blob = new Blob([this.model], { type: 'text/'+this.format });
            importedSaveAs(blob);
        }
    }


}
