import { TestBed } from '@angular/core/testing';

import { TVsService } from './tvs.service';

describe('TVsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TVsService = TestBed.get(TVsService);
    expect(service).toBeTruthy();
  });
});
