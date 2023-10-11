import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import {} from 'googlemaps';
import {} from 'gojs';
import * as go from 'gojs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  title = 'vaikhanasa-app';
  address: any;
  place: any;
  name!: string;
  status!: string;

  nodeDataArray = [
    {
      key: 0,
      name: 'Radhakrishnan R',
      gender: 'M',
      birthYear: '1865',
    },
    {
      key: 1,
      parent: 0,
      name: 'R Balaji',
      gender: 'M',
      birthYear: '1965',
    },
    {
      key: 2,
      parent: 0,
      name: 'R Ravichandran',
      gender: 'M',
      birthYear: '1967',
    },
    {
      key: 3,
      parent: 0,
      name: 'R Venkatakrishnan',
      gender: 'M',
      birthYear: '1974',
    },
    {
      key: 4,
      parent: 0,
      name: 'B Padmini',
      gender: 'F',
      birthYear: '1967',
    },
    {
      key: 5,
      parent: 0,
      name: 'B Vaidehi',
      gender: 'F',
      birthYear: '1967',
    },
    {
      key: 6,
      parent: 1,
      name: 'Aadhithyan B',
      gender: 'M',
      birthYear: '1994',
    },
    {
      key: 7,
      parent: 1,
      name: 'Abinaya B',
      gender: 'F',
      birthYear: '1994',
    },
    {
      key: 8,
      parent: 1,
      name: 'Anirudhan B',
      gender: 'M',
      birthYear: '1998',
    },
    {
      key: 9,
      parent: 2,
      name: 'R Varshini',
      gender: 'F',
      birthYear: '1999',
    },
    {
      key: 10,
      parent: 2,
      name: 'R Srinidhi',
      gender: 'F',
      birthYear: '2002',
    },
    {
      key: 11,
      parent: 3,
      name: 'V Sanjeevi',
      gender: 'M',
      birthYear: '2015',
    },
    {
      key: 12,
      parent: 3,
      name: 'V Dhanyasree',
      gender: 'F',
      birthYear: '2012',
    },
    {
      key: 13,
      parent: 4,
      name: 'Ananth B',
      gender: 'M',
      birthYear: '1996',
    },
    {
      key: 14,
      parent: 4,
      name: 'Pavithra B',
      gender: 'F',
      birthYear: '1990',
    },
    {
      key: 15,
      parent: 5,
      name: 'Akshaya B',
      gender: 'F',
      birthYear: '1990',
    },
    {
      key: 16,
      parent: 5,
      name: 'Dheekshana B',
      gender: 'F',
      birthYear: '1990',
    },
  ];

  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(20.5937, 78.9629),
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );

    this.map.addListener('click', (event: any) => {
      const marker = new google.maps.Marker({
        position: event.latLng,
        map: this.map,
      });
      const data = this.rowData;
      data.push({ location: event.tb.x + '-' + event.tb.y });
      this.rowData = [...data];
    });

    this.initFT();
  }

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'status' },
    { field: 'address' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData: any;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {}

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.rowData = [];
  }

  getAddress(place: any) {
    console.log(place);
    this.address = place['formatted_address'];
    this.place = place;
  }

  addToMap() {
    if (
      this.name === null ||
      this.place === null ||
      this.name === undefined ||
      this.place === undefined ||
      this.name === ''
    )
      return;
    const marker = new google.maps.Marker({
      position: this.place.geometry.location,
      map: this.map,
    });
    const data = this.rowData;
    data.push({
      name: this.name,
      status: this.status,
      address: this.address,
      location: this.place.geometry.location,
      lat: this.place.geometry.location.lat(),
      lng: this.place.geometry.location.lng(),
    });
    this.rowData = [...data];
    var bounds = new google.maps.LatLngBounds();
    const markers = this.rowData.map((r: any) => {
      return { lat: r.lat, lng: r.lng };
    });
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i]);
    }
    this.map.fitBounds(bounds);
    //this.map.panTo(this.place.geometry.location);
  }

  initFT() {
    const init = () => {
      // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
      // For details, see https://gojs.net/latest/intro/buildingObjects.html
      const $ = go.GraphObject.make; // for conciseness in defining templates

      const myDiagram = new go.Diagram(
        'myDiagramDiv', // must be the ID or reference to div
        {
          'toolManager.hoverDelay': 100, // 100 milliseconds instead of the default 850
          allowCopy: false,
          // create a TreeLayout for the family tree
          layout: $(go.TreeLayout, {
            angle: 90,
            nodeSpacing: 10,
            layerSpacing: 40,
            layerStyle: go.TreeLayout.LayerUniform,
          }),
        }
      );

      var bluegrad = '#90CAF9';
      var pinkgrad = '#F48FB1';

      // Set up a Part as a legend, and place it directly on the diagram
      myDiagram.add(
        $(
          go.Part,
          'Table',
          { position: new go.Point(0, 0), selectable: false },
          $(go.TextBlock, 'Key', {
            row: 0,
            font: '700 14px Droid Serif, sans-serif',
          }), // end row 0
          $(
            go.Panel,
            'Horizontal',
            { row: 1, alignment: go.Spot.Left },
            $(go.Shape, 'Rectangle', {
              desiredSize: new go.Size(30, 30),
              fill: bluegrad,
              margin: 5,
            }),
            $(go.TextBlock, 'Males', {
              font: '700 13px Droid Serif, sans-serif',
            })
          ), // end row 1
          $(
            go.Panel,
            'Horizontal',
            { row: 2, alignment: go.Spot.Left },
            $(go.Shape, 'Rectangle', {
              desiredSize: new go.Size(30, 30),
              fill: pinkgrad,
              margin: 5,
            }),
            $(go.TextBlock, 'Females', {
              font: '700 13px Droid Serif, sans-serif',
            })
          ) // end row 2
        )
      );

      // get tooltip text from the object's data
      function tooltipTextConverter(person: any) {
        var str = '';
        str += 'Born: ' + person.birthYear;
        if (person.deathYear !== undefined)
          str += '\nDied: ' + person.deathYear;
        if (person.reign !== undefined) str += '\nReign: ' + person.reign;
        return str;
      }

      // define tooltips for nodes
      var tooltiptemplate = $(
        'ToolTip',
        { 'Border.fill': 'whitesmoke', 'Border.stroke': 'black' },
        $(
          go.TextBlock,
          {
            font: 'bold 8pt Helvetica, bold Arial, sans-serif',
            wrap: go.TextBlock.WrapFit,
            margin: 5,
          },
          new go.Binding('text', '', tooltipTextConverter)
        )
      );

      // define Converters to be used for Bindings
      function genderBrushConverter(gender: any) {
        if (gender === 'M') return bluegrad;
        if (gender === 'F') return pinkgrad;
        return 'orange';
      }

      // replace the default Node template in the nodeTemplateMap
      myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        { deletable: false, toolTip: tooltiptemplate },
        new go.Binding('text', 'name'),
        $(
          go.Shape,
          'Rectangle',
          {
            fill: 'lightgray',
            stroke: null,
            strokeWidth: 0,
            stretch: go.GraphObject.Fill,
            alignment: go.Spot.Center,
          },
          new go.Binding('fill', 'gender', genderBrushConverter)
        ),
        $(
          go.TextBlock,
          {
            font: '700 12px Droid Serif, sans-serif',
            textAlign: 'center',
            margin: 10,
            maxSize: new go.Size(1000, NaN),
          },
          new go.Binding('text', 'name')
        )
      );

      // define the Link template
      myDiagram.linkTemplate = $(
        go.Link, // the whole link panel
        { routing: go.Link.Orthogonal, corner: 5, selectable: false },
        $(go.Shape, { strokeWidth: 3, stroke: '#424242' })
      ); // the gray link shape

      // here's the family data

      // create the model for the family tree
      myDiagram.model = new go.TreeModel(this.nodeDataArray);

      document
        .getElementById('zoomToFit')!
        .addEventListener('click', () => myDiagram.commandHandler.zoomToFit());

      document.getElementById('centerRoot')!.addEventListener('click', () => {
        myDiagram.scale = 1;
        myDiagram.scrollToRect(myDiagram.findNodeForKey(0)!.actualBounds);
      });
    };
    window.addEventListener('DOMContentLoaded', init);
  }
}
