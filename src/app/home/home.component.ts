import { Component } from '@angular/core';
import { ViewPortService } from '../shared/viewport.service';
import { Observable, of } from 'rxjs';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Chandra grahanam protocol',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'All india vaikhanasa meetup plan',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Updated Panchangam',
      updated: new Date('1/18/16'),
    },
  ];
  eventDate = new Date('12/12/23');
  isMobile: Observable<boolean> = of(false);
  gridRows: number[][] = [];

  constructor(private readonly viewportService: ViewPortService) {
    this.viewportService.isMobile.subscribe(
      (isMobile) =>
        (this.gridRows = isMobile
          ? [
              [4, 1],
              [4, 1],
              [4, 1],
              [4, 1],
            ]
          : [
              [3, 1],
              [1, 2],
              [1, 1],
              [2, 1],
            ])
    );
  }
}
