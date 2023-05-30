import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsDropdownComponent } from './labels-dropdown.component';

describe('LabelsDropdownComponent', () => {
  let component: LabelsDropdownComponent;
  let fixture: ComponentFixture<LabelsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
