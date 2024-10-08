import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPageComponent } from './panel-page.component';

describe('PanelPageComponent', () => {
  let component: PanelPageComponent;
  let fixture: ComponentFixture<PanelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
