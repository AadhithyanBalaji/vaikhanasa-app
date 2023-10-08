import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, CellClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import {} from 'googlemaps';

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
}
