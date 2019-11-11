import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {TdLoadingService, TdMediaService} from "@covalent/core";
import {BrowserService} from "../../services/browser.service";
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-editor.component.html',
  styleUrls: ['./resource-editor.component.scss']
})
export class ResourceEditorComponent implements OnInit, AfterViewInit {

  constructor(public media: TdMediaService, public browserService: BrowserService,
              private _loadingService: TdLoadingService) { }

  // Code Editor


    language = 'json';

    model =
         '{ \n' +
            "\t\"resourceType\" :" +
            "\"...\" \n"+
            '}'
    ;

    editorOptions = {theme: 'vs',
    language: 'json'};

  validate() {
      //this._loadingService.register('overlayStarSyntax');
      this.browserService.setupResource(this.model);
  }

  ngOnInit() {


      this.browserService.getRawResourceChangeEmitter().subscribe(
          (data) => {

              this.model = data.trim();
              if (this.model[0] =='<')  {
                  this.language = 'xml';
              } else {
                  this.language = 'json';
              }
          }
      );

      this.browserService.getValidationChangeEmitter().subscribe(
          (data) => {
              if (data == undefined) {
                  // Is Validating
                  this._loadingService.register('overlayStarSyntax');
              } else {
                  this._loadingService.resolve('overlayStarSyntax');
              }
          }
      );

      if (this.browserService.getRawResource() !== undefined) {
          console.log('trigger getRawResource');
          this.browserService.triggerGetRawResource();
      }

  }
    ngAfterViewInit() {
        // console.log('after init');

    }

    onInit(editor) {
        let line = editor.getPosition();
        console.log(line);
    }

    save(){
        {
            if (this.model[0]=='<')  {
                this.language = 'xml';
            } else {
                this.language ='json';
            }
            const blob = new Blob([this.model], { type: 'text/'+this.language });
            importedSaveAs(blob);
        }
    }


}
