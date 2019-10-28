import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Bundle, BundleEntry} from "fhir-stu3";
import {BrowserService} from "../browser.service";

@Component({
  selector: 'app-resource-browser',
  templateUrl: './resource-browser.component.html',
  styleUrls: ['./resource-browser.component.scss']
})
export class ResourceBrowserComponent implements OnInit, AfterViewInit {

  constructor(public browserService: BrowserService) { }

  entries: BundleEntry[];

  resource;

  ngOnInit() {
    this.browserService.getResourceChangeEmitter().subscribe(
        (result) => {
          var bundle: Bundle = this.convertToJson(result);
          if (bundle != undefined && bundle.entry != undefined) {
            console.log('entries = ' + bundle.total);
            this.entries = bundle.entry;
          }
        }
    )
  }

  ngAfterViewInit() {
    console.log('after init');
    if (this.browserService.getResource() !== undefined) {
      const data = this.browserService.getResource();
      var bundle: Bundle = this.convertToJson(data);
      if (bundle != undefined && bundle.entry != undefined) {
        console.log('entries = ' + bundle.total);
        this.entries = bundle.entry;
      }

    }
  }

  onClick(entry) {
    this.resource = entry.resource;
  }
  convertToJson(data): Bundle {
    var object = JSON.parse(data);
    return object;
  }

}
