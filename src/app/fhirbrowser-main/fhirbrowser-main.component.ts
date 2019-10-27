import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fhirbrowser-main',
  templateUrl: './fhirbrowser-main.component.html',
  styleUrls: ['./fhirbrowser-main.component.scss']
})
export class FHIRBrowserMainComponent implements OnInit {

  constructor() { }

  navmenu: Object[] = [{
    icon: 'looks_one',
    route: '.',
    title: 'First item',
    description: 'Item description',
  }, {
    icon: 'looks_two',
    route: '.',
    title: 'Second item',
    description: 'Item description',
  }, {
    icon: 'looks_3',
    route: '.',
    title: 'Third item',
    description: 'Item description',
  }, {
    icon: 'looks_4',
    route: '.',
    title: 'Fourth item',
    description: 'Item description',
  }, {
    icon: 'looks_5',
    route: '.',
    title: 'Fifth item',
    description: 'Item description',
  },
  ];
  validationFlags: [
      {
        item : 'Errors'
      }];

  ngOnInit() {
  }

}
