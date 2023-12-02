import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewPortService {
  private mobileMaxWidth = '800';
  private _isMobile: Observable<boolean> = of(false);

  public get isMobile() {
    return this._isMobile;
  }

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this._isMobile = this.breakpointObserver
      .observe(`(max-width: ${this.mobileMaxWidth}px)`)
      .pipe(map(({ matches }) => matches));
  }
}
