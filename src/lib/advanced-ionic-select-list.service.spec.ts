import { TestBed } from '@angular/core/testing';

import { AdvancedIonicSelectListService } from './advanced-ionic-select-list.service';

describe('AdvancedIonicSelectListService', () => {
  let service: AdvancedIonicSelectListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedIonicSelectListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
