import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTemplatesComponent } from './note-templates.component';

describe('NoteTemplatesComponent', () => {
  let component: NoteTemplatesComponent;
  let fixture: ComponentFixture<NoteTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
