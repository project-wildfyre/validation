import {Component, EventEmitter, OnInit} from '@angular/core';
import {TdMediaService} from "@covalent/core";

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-editor.component.html',
  styleUrls: ['./resource-editor.component.scss']
})
export class ResourceEditorComponent implements OnInit {

  constructor(public media: TdMediaService) { }

  // Tab
  disabled: boolean = false;
  value: string = '';

  // File picker
  filedisabled: boolean = false;

  // Code Editor
  model: any;
  files: any;
  input: string = '{ \n' +
      "\t\"resourceType\" :" +
      "\"...\" \n"+
      '}';

  public json = true;

  resources: string[];

  public loadComplete: EventEmitter<any> = new EventEmitter();
  multi: any;
  object: any;



  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  selectEvent(file: FileList | File): void {
    if (file instanceof File) {
      let reader = new FileReader();
      reader.readAsText(file);
      this.loadComplete.subscribe( (data) => {
            //this.buildBundle(data);
            this.input = data;
            if (file.name.toLowerCase().includes('.xml')) {
              this.json = false;
            }
            if (file.name.toLowerCase().includes('.json')) {
              this.json = true;
            }
          }
      );
      const me = this;
      reader.onload = (event: Event) => {
        if (reader.result instanceof ArrayBuffer) {
          // console.log('array buffer');

          me.loadComplete.emit(reader.result);
        } else {
          // console.log('not a buffer');
          me.loadComplete.emit(reader.result);
        }
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    }
  }


  uploadEvent(files: FileList | File): void {
    if (files instanceof FileList) {

    } else {

    }
  }

  cancelEvent(): void {

  }

  ngOnInit() {
  }

}
