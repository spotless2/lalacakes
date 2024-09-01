import { TestBed } from '@angular/core/testing';

import { SliderInitService } from './slider-init.service';

describe('SliderInitService', () => {
  let service: SliderInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
