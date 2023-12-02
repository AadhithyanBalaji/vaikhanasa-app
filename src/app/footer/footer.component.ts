import { Component } from '@angular/core';
import { ViewPortService } from '../shared/viewport.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  isMobile: Observable<boolean> = of(false);

  constructor(private readonly viewportService: ViewPortService) {
    this.isMobile = this.viewportService.isMobile;
  }
}
