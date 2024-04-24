import { TestBed } from '@angular/core/testing';

import { SceduleListService } from './scedule-list.service';

describe('SceduleListService', () => {
  let service: SceduleListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceduleListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
