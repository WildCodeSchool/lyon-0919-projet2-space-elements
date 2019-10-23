import { TestBed } from '@angular/core/testing';

import { AmmoService } from './ammo.service';

describe('AmmoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmmoService = TestBed.get(AmmoService);
    expect(service).toBeTruthy();
  });
});
