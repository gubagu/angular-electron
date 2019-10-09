import { TestBed } from '@angular/core/testing';

import { FileUtilsService } from './file-utils.service';

describe('FileUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileUtilsService = TestBed.get(FileUtilsService);
    expect(service).toBeTruthy();
  });
});
