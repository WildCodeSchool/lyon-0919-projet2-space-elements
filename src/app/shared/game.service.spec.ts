import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('AmmoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});
