import { TestBed } from '@angular/core/testing';

import { IpcService } from './ipc.service';

describe('ServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpcService = TestBed.get(IpcService);
    expect(service).toBeTruthy();
  });
});
