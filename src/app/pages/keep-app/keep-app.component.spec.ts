import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepAppComponent } from './keep-app.component';

describe('KeepAppComponent', () => {
  let component: KeepAppComponent;
  let fixture: ComponentFixture<KeepAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeepAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
