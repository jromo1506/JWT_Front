import { TestBed } from '@angular/core/testing';

import { Swal2Service } from './swal2.service';

describe('Swal2Service', () => {
  let service: Swal2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Swal2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
