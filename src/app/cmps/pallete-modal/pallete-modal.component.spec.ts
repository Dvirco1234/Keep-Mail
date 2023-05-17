import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalleteModalComponent } from './pallete-modal.component';

describe('PalleteModalComponent', () => {
  let component: PalleteModalComponent;
  let fixture: ComponentFixture<PalleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
