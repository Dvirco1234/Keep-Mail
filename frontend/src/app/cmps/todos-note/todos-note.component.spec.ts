import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosNoteComponent } from './todos-note.component';

describe('TodosNoteComponent', () => {
  let component: TodosNoteComponent;
  let fixture: ComponentFixture<TodosNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
