import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingWizardComponent } from './matchmaking-wizard.component';

describe('MatchmakingWizardComponent', () => {
  let component: MatchmakingWizardComponent;
  let fixture: ComponentFixture<MatchmakingWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchmakingWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchmakingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
