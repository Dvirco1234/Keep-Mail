import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsModalComponent } from './labels-modal.component';

describe('LabelsModalComponent', () => {
  let component: LabelsModalComponent;
  let fixture: ComponentFixture<LabelsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
