import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { settingGuard } from './setting.guard';

describe('settingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => settingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
