import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'AutocompleteComponent',
  template: `
    <input
      class="input"
      type="text"
      [(ngModel)]="autocompleteInput"
      #addresstext
      style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
    />
    <span *ngIf="loading">Searching....</span>
  `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input() adressType!: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput!: string;
  queryWait!: boolean;
  loading = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        types: [this.adressType], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.loading = true;
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
    this.loading = false;
  }
}
