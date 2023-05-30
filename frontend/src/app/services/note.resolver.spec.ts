import { TestBed } from '@angular/core/testing';

import { NoteResolver } from './note.resolver';

describe('NoteResolver', () => {
  let resolver: NoteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NoteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
