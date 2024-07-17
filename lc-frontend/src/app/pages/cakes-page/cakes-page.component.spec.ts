import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakesPageComponent } from './cakes-page.component';

describe('CakesPageComponent', () => {
  let component: CakesPageComponent;
  let fixture: ComponentFixture<CakesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CakesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CakesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
