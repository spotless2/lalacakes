import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesPageComponent } from './plates-page.component';

describe('PlatesPageComponent', () => {
  let component: PlatesPageComponent;
  let fixture: ComponentFixture<PlatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
