import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavFilterComponent } from './side-nav-filter.component';

describe('SideNavFilterComponent', () => {
  let component: SideNavFilterComponent;
  let fixture: ComponentFixture<SideNavFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
